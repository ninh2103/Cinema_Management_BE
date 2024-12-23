import { Module } from '@nestjs/common';
import { EnentService } from './event.service';
import { EnentController } from './event.controller';
import { PrismaService } from 'src/prisma.services';

@Module({
  controllers: [EnentController],
  providers: [EnentService, PrismaService],
})
export class EnentModule {}
