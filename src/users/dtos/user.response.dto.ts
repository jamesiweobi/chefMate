import { Expose } from 'class-transformer';

export class UserResDTO {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  isAdmin: boolean;

  @Expose()
  createdAt: string;
}
