import {
  IsEmail,
  IsBoolean,
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UsersDTO {
  @IsString()
  @IsNotEmpty({
    message: 'username cannot be empty, please provide a username',
  })
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty({
    message: 'Email cannot be empty, please provide a valid email',
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Please provide a valid 6 character password.',
  })
  @MinLength(6, {
    message: 'Title is too short',
  })
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

export class UserLoginDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty({
    message: 'username cannot be empty, please provide a username',
  })
  username: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({
    message: 'Email cannot be empty, please provide a valid email',
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Please provide a valid 6 character password.',
  })
  @MinLength(6, {
    message: 'Title is too short',
  })
  password: string;
}
