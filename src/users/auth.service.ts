import {
  BadRequestException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UserLoginDTO, UsersDTO } from './user.dto';
import { UserDocument } from './User.model';
import { UsersService } from './users.service';
import hash from '../utils/hashPassword.utils';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(loginUser: UserLoginDTO): Promise<Token> {
    const user = await this.usersService.find(loginUser);
    // TODO: add auth jwt feature here to signToken
  }

  async singUp(user: UsersDTO): Promise<UserDocument> {
    const userExists = await this.usersService.find('email', user.email);
    if (userExists) {
      throw new BadRequestException('email in use.');
    }
    const hashedPassword = await hash(user.password);
    const newUser = await this.usersService.create({
      password: hashedPassword,
      ...user,
    });
    return newUser;
  }
}
