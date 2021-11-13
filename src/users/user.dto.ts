import { IsEmail, IsBoolean, IsString } from 'class-validator';

export class UsersDTO {
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  isAdmin: boolean;

  constructor(data) {
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.isAdmin = data.isAdmin;
  }
}
