import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserResDTO } from './dtos/user.response.dto';
import { Serialize } from './interceptor/serialize.interceptor';
import { UserLoginDTO, UsersDTO } from './user.dto';
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
  async createUser(
    @Body() body: UsersDTO,
    @Session() session: any,
  ): Promise<UserDocument> {
    const user = await this.authService.singUp(body);
    session.userId = user.id;
    return user;
  }

  @Get('whoami')
  async whoami(@Session() session: any) {
    console.log(session.userId);
    return await this.userService.findOneById(session.userId);
  }

  @Post('signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('signin')
  async signIn(
    @Body() body: UserLoginDTO,
    @Session() session: any,
  ): Promise<UserDocument> {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }
}
