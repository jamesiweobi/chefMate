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
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  id: string;

  @IsBoolean()
  isAdmin: boolean;
}
