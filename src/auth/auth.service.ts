import { Injectable } from '@nestjs/common';
import { UserLoginDTO, UsersDTO } from '../users/user.dto';
import { UserDocument } from '../users/User.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async create(users: UsersDTO): Promise<UserDocument> {
    return await this.usersService.create(users);
  }

  async findOneById(id: string): Promise<UserDocument> {
    return await this.usersService.findOneById(id);
  }

  async login(loginUser: UserLoginDTO): Promise<Token> {
    const user = await this.usersService.find(loginUser);
    // TODO: add auth jwt feature here to signToken
  }
  // async singUp(users: UsersDTO): Promise<Token> {}
}
