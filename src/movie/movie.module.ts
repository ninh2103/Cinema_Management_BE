import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaService } from 'src/prisma.services';

@Module({
  controllers: [MovieController],
  providers: [MovieService, PrismaService],
})
export class MovieModule {}
