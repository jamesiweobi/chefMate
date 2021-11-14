import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { IsBoolean } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = Document & User;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @IsBoolean()
  @Prop({ required: true })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface IUser extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IUserUpdate {
  id: string;
  username?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
}
