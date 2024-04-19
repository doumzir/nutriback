import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsertestService {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
      },
    });
  }
}
