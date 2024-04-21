import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserType } from '@prisma/client';
import { Prisma } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('When user is returned should return hashed password', async () => {
    const data: Prisma.UserCreateInput = {
      email: 'TestHashPassword@example.com',
      password: bcrypt.hashSync('azerty123456', 10),
      firstname: 'TestHashPasswordFirstName',
      lastname: 'TestHashPasswordLastName',
      userName: 'TestHashPasswordUserName',
      userType: UserType.COACH,
    };
    await prisma.user.create({ data });
    const user = await prisma.user.findFirst({
      where: { email: 'TestHashPassword@example.com' },
    });
    expect(bcrypt.compare(data.password, user.password)).toBeTruthy();
  });
});
