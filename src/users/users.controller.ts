import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.gaurd';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserResDTO } from './dtos/user.response.dto';
import { Serialize } from './interceptor/serialize.interceptor';
import { UserLoginDTO, UsersDTO } from './user.dto';
import { User, UserDocument } from './User.model';
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
    const user = await this.authService.signUp(body);
    session.userId = user.id;
    return user;
  }

  @Post('signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }

  @Get('whoami')
  @UseGuards(AuthGuard)
  async whoami(@CurrentUser() user: User) {
    return user;
  }

  @Post('signin')
  async signIn(
    @Body() body: UserLoginDTO,
    @Session() session: any,
  ): Promise<UserDocument> {
    const user = await this.authService.signIn(body);
    session.userId = user.id;
    return user;
  }
}
