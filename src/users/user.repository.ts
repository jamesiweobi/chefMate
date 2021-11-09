import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDTO } from './user.dto';
import { UserDocument, UserModel } from './User.model';
import { UsersModule } from './users.module';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  async create(user: User): Promise<UserDocument> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }
}
