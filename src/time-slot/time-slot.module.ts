import { Module } from '@nestjs/common';
import { TimeSlotService } from './time-slot.service';
import { TimeSlotController } from './time-slot.controller';
import { PrismaService } from 'src/prisma.services';

@Module({
  controllers: [TimeSlotController],
  providers: [TimeSlotService, PrismaService],
})
export class TimeSlotModule {}
