import { Test, TestingModule } from '@nestjs/testing';
import { CinemaroomService } from './cinemaroom.service';

describe('CinemaroomService', () => {
  let service: CinemaroomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CinemaroomService],
    }).compile();

    service = module.get<CinemaroomService>(CinemaroomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
