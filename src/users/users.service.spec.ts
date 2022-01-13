// import { getModelToken } from '@nestjs/mongoose';
// import { Test, TestingModule } from '@nestjs/testing';
// import { Model } from 'mongoose';
// import { UsersDTO } from './user.dto';
// import { UserDocument } from './User.model';
// import { UsersEnum } from './users.enum';
// import { UsersService } from './users.service';

// const newMockUser: UsersDTO = {
//   // id: 'fake-id',
//   username: 'fake-user',
//   email: 'fakee@email.com',
//   password: 'string',
//   isAdmin: false,
// };

// describe('UsersService', () => {
//   let service: UsersService;
//   let model: Model<UserDocument>;

//   const FakeUsersService = {
//     // findOne: () => Promise.resolve([]),
//     create: jest.fn((user) => {
//       return { id: 'fake-id', ...fakeUserDTO };
//     }),
//     // find:jest.fn().mockImplementation(() => UsersDTO[]),
//     // create: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UsersService,
//         {
//           provide: UsersService,
//           useValue: FakeUsersService,
//         },
//       ],
//     }).compile();

//     service = module.get<UsersService>(UsersService);
//     model = module.get<Model<UserDocument>>(getModelToken('User'));
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should have a create function', () => {
//     expect(service.create).toBeDefined();
//   });

//   it('UsersService.create should create and return a user with id', async () => {
//     jest
//       .spyOn(model, 'create')
//       .mockImplementationOnce(() => Promise.resolve(newMockUser));

//     const newUser = await service.create(newMockUser);
//     console.log(newUser);
//     expect(fakeUserDTO).toEqual(newMockUser);
//   });
// });
