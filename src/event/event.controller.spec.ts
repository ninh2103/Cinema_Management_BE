import { Test, TestingModule } from '@nestjs/testing';
import { EnentController } from './event.controller';
import { EnentService } from './event.service';

describe('EnentController', () => {
  let controller: EnentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnentController],
      providers: [EnentService],
    }).compile();

    controller = module.get<EnentController>(EnentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
