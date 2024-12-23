import { Test, TestingModule } from '@nestjs/testing';
import { SnackController } from './snack.controller';
import { SnackService } from './snack.service';

describe('SnackController', () => {
  let controller: SnackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnackController],
      providers: [SnackService],
    }).compile();

    controller = module.get<SnackController>(SnackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
