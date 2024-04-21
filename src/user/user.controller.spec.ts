import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserModule } from './user.module';
import { Prisma, UserType } from '@prisma/client';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Given user is created should return user without password', async () => {
    //ARRANGE
    const user: Prisma.UserCreateInput = {
      email: 'test@gmail.com',
      password: '123456',
      firstname: 'John',
      lastname: 'Doe',
      userName: 'JohnDoe',
      userType: UserType.COACH,
    };
    //ACT
    const response = await controller.createUser(user);
    //ASSERT
    expect(response).toBeDefined();
    expect(response).not.toHaveProperty('password');
  });
});
