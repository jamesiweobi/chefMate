import { Test, TestingModule } from '@nestjs/testing';
import { UsersDTO } from '../users/user.dto';
import { AuthService } from './auth.service';
import { IUser, UserDocument } from '../users/user.model';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser: UsersDTO = {
    username: 'fake-user',
    email: 'fakeEmail@email.com',
    password: 'fakePassword',
    isAdmin: true,
  };

  // .mockImplementation(() =>
  //   Promise.resolve({ id: new Date().toString(), ...mockUser }),
  // ),
  const FakeUsersService: Partial<UsersService> = {
    // login: jest.fn(),
    create: jest
      .fn()
      .mockImplementation((mockUser: UsersDTO) =>
        Promise.resolve({ id: new Date().toString(), ...mockUser }),
      ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
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

  it('should have a create method defined', () => {
    expect(service.create).toBeDefined();
  });

  it('should create and return a new user', async () => {
    expect(await service.create(mockUser)).toEqual({
      id: expect.any(String),
      ...mockUser,
    });
  });

  it('should have a login method created', () => {
    expect(service.login).toBeDefined();
  });
});
