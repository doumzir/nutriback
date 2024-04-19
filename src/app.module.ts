import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

import { UsertestModule } from './usertest/usertest.module';

@Module({
  imports: [UserModule, PrismaModule, UsertestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
