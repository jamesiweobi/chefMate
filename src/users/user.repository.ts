import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser, User, UserDocument } from './User.model';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  async create(user: UserDocument): Promise<IUser> {
    return await this.create(user);
  }
}
