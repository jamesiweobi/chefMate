import { Test, TestingModule } from '@nestjs/testing';
import { UsersDTO } from './user.dto';
import { AuthService } from './auth.service';
import { IUser, User, UserDocument } from './user.model';
import { UsersService } from './users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let FakeUsersService: Partial<UsersService>;
  const mockUser: User = {
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
      findOne: () => Promise.resolve({} as UserDocument),
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
    expect(service.signUp).toBeDefined();
  });

  it('should use signup to create a new user with a salt and hashed password.', async () => {
    const user = await service.signUp(mockUser);
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
    try {
      await service.signUp(mockUser);
    } catch (err) {
      expect(err).toStrictEqual(new BadRequestException('Email in use.'));
    }
  });

  it('should throw an error, if user email or username does not exist', async () => {
    FakeUsersService.findOne = () => Promise.resolve(undefined);
    try {
      await service.signIn(mockUser);
    } catch (err) {
      expect(err).toEqual(new NotFoundException('User does not exist.'));
    }
  });

  it('should throw an error, if the password is wrong', async () => {
    FakeUsersService.findOne = () =>
      Promise.resolve({
        username: 'fake-james',
        email: 'fakeJamesFaked@email.com',
        password: 'fakeJamesPassword',
        isAdmin: true,
      } as UserDocument);
    try {
      await service.signIn(mockUser);
    } catch (err) {
      const t = new BadRequestException('Username, Email, or Password wrong.');
      expect(err).toEqual(t);
    }
  });

  it('should signin user with valid email or username and password', async () => {
    FakeUsersService.findOne = () =>
      Promise.resolve({
        password:
          'e7c88b7ef02bed72.c35e6b55186bd60df73108903c4ab191267af3d1da999b34dee547425acd3d78',
        ...mockUser,
      } as UserDocument);
    const signinUser = await service.signIn({
      username: 'fake-james',
      email: 'fakeJamesFaked@email.com',
      password: 'fakeJamesPassword',
    });
    expect(signinUser).toBeDefined();
  });
});
