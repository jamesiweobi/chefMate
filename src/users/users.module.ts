import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { UserSchema } from './User.model';
import { UsersRepository } from './user.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  providers: [AuthService, UsersRepository, UsersService],
  exports: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
