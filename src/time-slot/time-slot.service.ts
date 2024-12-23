import { Injectable } from '@nestjs/common';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';
import { PrismaService } from 'src/prisma.services';

@Injectable()
export class TimeSlotService {
  constructor(private prismaService: PrismaService) {}
  async create(createTimeSlotDto: CreateTimeSlotDto) {
    const timeSlot = await this.prismaService.timeSlot.create({
      data: {
        StartTime: createTimeSlotDto.StartTime,
        EndTime: createTimeSlotDto.EndTime,
      },
    });
    return timeSlot;
  }

  findAll() {
    return `This action returns all timeSlot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timeSlot`;
  }

  update(id: number, updateTimeSlotDto: UpdateTimeSlotDto) {
    return `This action updates a #${id} timeSlot`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeSlot`;
  }
}
