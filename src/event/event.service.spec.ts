import { Test, TestingModule } from '@nestjs/testing';
import { EnentService } from './event.service';

describe('EnentService', () => {
  let service: EnentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnentService],
    }).compile();

    service = module.get<EnentService>(EnentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
