import { Test, TestingModule } from '@nestjs/testing';
import { SnackService } from './snack.service';

describe('SnackService', () => {
  let service: SnackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnackService],
    }).compile();

    service = module.get<SnackService>(SnackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
