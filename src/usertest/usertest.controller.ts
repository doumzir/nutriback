import { Controller, Get } from '@nestjs/common';
import { UsertestService } from './usertest.service';

@Controller('usertest')
export class UsertestController {
  constructor(private readonly usertestService: UsertestService) {}
  @Get()
  getAllUsers() {
    return this.usertestService.getUsers();
  }
}
