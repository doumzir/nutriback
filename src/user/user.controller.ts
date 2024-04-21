import { Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';
import { UserWithoutPassword } from './userDto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(user: Prisma.UserCreateInput): Promise<UserWithoutPassword> {
    const response = await this.userService.createUser(user);
    return response;
  }
}
