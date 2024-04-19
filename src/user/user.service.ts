import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { userWithoutPassword } from './userDto';

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

  async createUser(data: Prisma.UserCreateInput): Promise<userWithoutPassword> {
    const response = await this.prisma.user.create({ data });
    const userWithoutPassword: userWithoutPassword = {
      email: response.email,
      firstname: response.firstname,
      lastname: response.lastname,
      userName: response.userName,
      userType: response.userType,
    };
    return userWithoutPassword;
  }
}
