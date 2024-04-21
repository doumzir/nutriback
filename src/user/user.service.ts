import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserWithoutPassword } from './userDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  public async getUser(userName: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { userName: userName },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<UserWithoutPassword> {
    //ToDo : Control password format
    data.password = await bcrypt.hash(data.password, 10);
    const response = await this.prisma.user.create({ data });
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      password,
      ...userWithoutPassword
    }: { password: string } & UserWithoutPassword = response;
    return userWithoutPassword;
  }
}
