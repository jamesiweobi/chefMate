import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserLoginDTO, UsersDTO } from './user.dto';
import { UserDocument } from './User.model';
import { UsersService } from './users.service';
import { passHasher, passRehasher } from '../utils/hashPassword.utils';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(loginUser: UserLoginDTO) {
    let user;
    if (loginUser.email) {
      user = await this.usersService.findOne('email', loginUser.email);
    } else if (loginUser.username) {
      user = await this.usersService.findOne('username', loginUser.username);
    }
    if (!user) {
      throw new NotFoundException('User does not exist.');
    }
    const [salt, hashedPassword] = user.password.split('.');
    const passwordHash = await passRehasher(loginUser.password, salt);
    if (user.password !== passwordHash) {
      throw new BadRequestException('Username, Email, or Password wrong.');
    }
    return user;
  }

  async signUp(user: UsersDTO): Promise<UserDocument> {
    const userExists = await this.usersService.find('email', user.email);
    if (userExists.length) {
      throw new BadRequestException('Email in use.');
    }

    const hashedPassword = await passHasher(user.password);
    user.password = hashedPassword;
    const newUser = await this.usersService.create(user);
    return newUser;
  }
}
