import { Test, TestingModule } from '@nestjs/testing';
import { UsertestController } from './usertest.controller';

describe('UsertestController', () => {
  let controller: UsertestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsertestController],
    }).compile();

    controller = module.get<UsertestController>(UsertestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
