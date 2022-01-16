import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { UserSchema } from './User.model';
import { UsersRepository } from './user.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  providers: [
    AuthService,
    UsersRepository,
    UsersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  exports: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
