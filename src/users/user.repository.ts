import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDTO } from './user.dto';
import { IUser, UserDocument } from './User.model';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('Users') private readonly userModel: Model<IUser>) {}

  async create(user: UsersDTO): Promise<UserDocument> {
    return await this.userModel.create(user);
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
}
