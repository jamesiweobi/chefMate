import { Injectable, NotFoundException } from '@nestjs/common';
import { UserLoginDTO, UsersDTO } from './user.dto';
import { UserDocument } from './User.model';
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

  async find(user: UserLoginDTO): Promise<UserDocument> {
    if (user.email) {
      return await this.usersRepository.find('email', user.email);
    }
    if (user.username) {
      return await this.usersRepository.find('username', user.username);
    }
  }
}
