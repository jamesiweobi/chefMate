import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserResDTO } from './dtos/user.response.dto';
import { Serialize } from './interceptor/serialize.interceptor';
import { UsersDTO } from './user.dto';
import { UserDocument } from './User.model';
import { UsersService } from './users.service';

@Serialize(UserResDTO)
@Controller('auth')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async createUser(@Body() body: UsersDTO): Promise<UserDocument> {
    const user = await this.authService.singUp(body);
    return user;
  }
}
