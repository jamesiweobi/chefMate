import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDTO } from './user.dto';
import { IUser, IUserUpdate, UserDocument } from './User.model';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('Users') private readonly userModel: Model<IUser>) {}

  async create(user: UsersDTO): Promise<UserDocument> {
    const userExists = await this.userModel.find({ username: user.username });
    if (!userExists) {
      return await this.userModel.create(user);
    }
    throw new BadRequestException('Username taken!');
  }

  async findOneById(id: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException(`No user found!`);
      }
      return user;
    } catch (err) {
      if (err.name == 'CastError') {
        throw new BadRequestException(`Invalid user id: ${id}`);
      }
      throw new NotFoundException('User not found!');
    }
  }

  async find(field: string, params: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      [field]: params,
    });
    if (user) {
      return user;
    }
    throw new NotFoundException(`user does not exist`);
  }

  async updateOne(updateData: IUserUpdate): Promise<UserDocument> {
    const user = await this.findOneById(updateData.id);
    for (let key in updateData) {
      user[key] = updateData[key];
    }
    return user.save();
  }

  async removeOne(userId: string): Promise<string> {
    try {
      await this.userModel.deleteOne({ _id: userId });
      return 'OK';
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
