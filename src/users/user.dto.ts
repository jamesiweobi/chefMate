import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UsersEnum } from './users.enum';

export class UsersDTO {
  // @IsString()
  // @IsOptional()
  // id: string;

  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;

  constructor(data) {
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
  }
}

export interface User {
  // id: string;
  username: string;
  email: string;
  password: string;
  role: UsersEnum;
}
