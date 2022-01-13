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
    message: 'Username cannot be empty, please provide a username',
  })
  username: string;

  @IsString()
  @IsEmail(undefined, {
    message: 'Please enter a valid email address',
  })
  @IsNotEmpty({
    message: 'Email cannot be empty, please provide a valid email',
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Please provide a valid 6 character password.',
  })
  @MinLength(6, {
    message: 'Password should me more than 6 characters',
  })
  password: string;

  @IsBoolean()
  isAdmin: boolean;
}

export class UserLoginDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty({
    message: 'Username cannot be empty, please provide a username',
  })
  username: string;

  @IsString()
  @IsOptional()
  @IsEmail(undefined, {
    message: 'Please enter a valid email address',
  })
  @IsNotEmpty({
    message: 'Email cannot be empty, please provide a valid email',
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Please provide a valid 6 character password.',
  })
  @MinLength(6, {
    message: 'Password should me more than 6 characters',
  })
  password: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty({
    message: 'Username cannot be empty, please provide a username',
  })
  username: string;

  @IsEmail(undefined, {
    message: 'Please enter a valid email address',
  })
  @IsNotEmpty({
    message: 'Email cannot be empty, please provide a valid email',
  })
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Please provide a valid 6 character password.',
  })
  @MinLength(6, {
    message: 'Password should me more than 6 characters',
  })
  password: string;

  @IsString()
  id: string;

  @IsBoolean({ message: 'A user type is required' })
  isAdmin: boolean;
}
