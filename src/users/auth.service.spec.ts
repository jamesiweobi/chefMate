import { Test, TestingModule } from '@nestjs/testing';
import { UsersDTO } from './user.dto';
import { AuthService } from './auth.service';
import { IUser, UserDocument } from './user.model';
import { UsersService } from './users.service';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let FakeUsersService: Partial<UsersService>;
  const mockUser: UsersDTO = {
    username: 'fake-james',
    email: 'fakeJamesFaked@email.com',
    password: 'fakeJamesPassword',
    isAdmin: true,
  };

  beforeEach(async () => {
    FakeUsersService = {
      find: () => Promise.resolve([] as UserDocument[]),
      create: jest
        .fn()
        .mockImplementation(({ username, email, password, isAdmin }) =>
          Promise.resolve({
            id: new Date().toString(),
            email,
            password,
            username,
            isAdmin,
          } as UserDocument),
        ),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: UsersService,
          useValue: FakeUsersService,
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should create instance of AuthService', async () => {
    expect(service).toBeDefined();
  });

  it('should have a signup method created', () => {
    expect(service.singUp).toBeDefined();
  });

  it('should use signup to create a new user with a salt and hashed password.', async () => {
    const user = await service.singUp(mockUser);
    const [salt, hash] = user.password.split('.');
    expect(user).toBeDefined();
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
    expect(user.id).toBeDefined();
  });

  it('should throw error if email in use', async () => {
    FakeUsersService.find = () =>
      Promise.resolve([
        {
          id: 'ajvsvujdvU9JDUV',
          username: 'fake-james',
          email: 'fakeJamesFaked@email.com',
          password: 'fakeJamesPassword',
          isAdmin: true,
        },
      ] as UserDocument[]);
    const t = new BadRequestException('Email in use.');
    try {
      await service.singUp(mockUser);
    } catch (err) {
      expect(err).toStrictEqual(new BadRequestException('Email in use.'));
    }
  });
});
