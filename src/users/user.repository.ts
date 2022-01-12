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
    const userUsernameExists = await this.userModel.find({
      username: user.username,
    });
    if (userUsernameExists.length) {
      throw new BadRequestException('Username is taken!');
    }
    return await this.userModel.create(user);
  }

  async findOneById(userId: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findById(userId);
      return user;
    } catch (err) {
      if (err.name == 'CastError') {
        throw new BadRequestException(`Invalid user id: ${userId}`);
      }
      throw new NotFoundException('User not found!');
    }
  }

  async findOne(field: string, params: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      [field]: params,
    });
    return user;
  }

  async find(field?: string, params?: string): Promise<UserDocument[]> {
    return await this.userModel.find({ [field]: params });
  }

  async updateOne(updateData: IUserUpdate): Promise<UserDocument> {
    const user = await this.findOneById(updateData.id);
    if (user) {
      for (let key in updateData) {
        user[key] = updateData[key];
      }
      return user.save();
    }
    throw new BadRequestException('User not found');
  }

  async removeOne(userId: string): Promise<string> {
    try {
      await this.userModel.deleteOne({ _id: userId });
      return 'OK';
    } catch (err) {
      if (err.name == 'CastError') {
        throw new BadRequestException(`Invalid user id: ${userId}`);
      }
      throw new NotFoundException('User not found!');
    }
  }
}
