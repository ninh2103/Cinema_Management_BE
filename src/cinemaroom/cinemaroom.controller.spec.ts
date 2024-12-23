import { Test, TestingModule } from '@nestjs/testing';
import { CinemaroomController } from './cinemaroom.controller';
import { CinemaroomService } from './cinemaroom.service';

describe('CinemaroomController', () => {
  let controller: CinemaroomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CinemaroomController],
      providers: [CinemaroomService],
    }).compile();

    controller = module.get<CinemaroomController>(CinemaroomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
