import { Injectable, NotFoundException } from '@nestjs/common';
import { UserLoginDTO, UsersDTO } from './user.dto';
import { IUserUpdate, UserDocument } from './User.model';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(user: UsersDTO): Promise<UserDocument> {
    return await this.usersRepository.create(user);
  }

  async findOneById(id: string): Promise<UserDocument> {
    return await this.usersRepository.findOneById(id);
  }

  async findOne(field: string, params: string) {
    const user = await this.usersRepository.findOne(field, params);
    return user;
  }

  async updateOne(user: IUserUpdate): Promise<UserDocument> {
    return await this.usersRepository.updateOne(user);
  }
  async find(field?: string, params?: string): Promise<UserDocument[]> {
    return await this.usersRepository.find(field, params);
  }
  async removeOne(userId: string): Promise<string> {
    const user = await this.usersRepository.findOneById(userId);
    if (user) {
      return await this.usersRepository.removeOne(userId);
    }
  }
}
