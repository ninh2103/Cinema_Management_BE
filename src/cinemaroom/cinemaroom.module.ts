import { Module } from '@nestjs/common';
import { CinemaroomService } from './cinemaroom.service';
import { CinemaroomController } from './cinemaroom.controller';
import { PrismaService } from 'src/prisma.services';

@Module({
  controllers: [CinemaroomController],
  providers: [CinemaroomService, PrismaService],
})
export class CinemaroomModule {}
