import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/User.model';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/user.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  providers: [AuthService, UsersService, UsersRepository],
  controllers: [AuthController],
})
export class AuthModule {}
