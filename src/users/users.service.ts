import { Injectable } from '@nestjs/common';
import { User, UsersDTO } from './user.dto';
import { UserDocument } from './User.model';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(user: UsersDTO): Promise<UserDocument> {
    const newUser = {
      createdAt: new Date().toISOString(),
      ...user,
    };
    return await this.usersRepository.create(newUser);
  }
}
