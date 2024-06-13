import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { passwordTest } from '../../prisma/seeds/dbTest/userSeeds';
import { PrismaService } from '../prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('AuthController', () => {
  let app: INestApplication;
  let controller: AuthController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UserModule, PrismaModule],
      controllers: [AuthController],
    }).compile();
    app = module.createNestApplication();

    controller = module.get<AuthController>(AuthController);
    prisma = module.get<PrismaService>(PrismaService);

    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('When signing in then should return valid token', async () => {
    const user = await prisma.user.findFirst();
    const token = await controller.signIn({
      userName: user.userName,
      password: passwordTest,
    });
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });
    console.log(response);
    expect(token).toBeDefined();
    expect(typeof token.access_token).toBe('string');

    const decodedToken: any = jwt.decode(token.access_token);
    expect(decodedToken.sub).toBe(user.id);
    expect(decodedToken.username).toBe(user.userName);
  });
});
