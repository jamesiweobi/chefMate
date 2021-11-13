import { Injectable } from '@nestjs/common';
import { IUser, UserDocument } from './User.model';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(user: UserDocument): Promise<IUser> {
    return await this.usersRepository.create(user);
  }
}
