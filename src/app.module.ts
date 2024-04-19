import { Module } from '@nestjs/common';
import { UsertestModule } from './usertest/usertest.module';

@Module({
  imports: [UsertestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
