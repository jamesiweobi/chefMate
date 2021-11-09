import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { Document } from 'mongoose';
import { UsersEnum } from './users.enum';

export type UserDocument = Document & UserModel;

@Schema({ timestamps: true })
export class UserModel {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @IsEnum(UsersEnum)
  @Prop({ required: true })
  role: UsersEnum;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
