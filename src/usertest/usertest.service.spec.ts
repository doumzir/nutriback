import { Test, TestingModule } from '@nestjs/testing';
import { UsertestService } from './usertest.service';

describe('UsertestService', () => {
  let service: UsertestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsertestService],
    }).compile();

    service = module.get<UsertestService>(UsertestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
