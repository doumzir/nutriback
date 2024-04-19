import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsertestController } from './usertest.controller';
import { UsertestService } from './usertest.service';

@Module({
  controllers: [UsertestController],
  providers: [UsertestService, PrismaService],
})
export class UsertestModule {}
