import { Injectable } from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { PrismaService } from 'src/prisma.services';

@Injectable()
export class HolidayService {
  constructor(private prismaService: PrismaService) {}
  async create(createHolidayDto: CreateHolidayDto) {
    const holiday = await this.prismaService.holiday.create({
      data: {
        Date: createHolidayDto.Date,
      },
    });

    return holiday;
  }

  findAll() {
    return `This action returns all holiday`;
  }

  findOne(id: number) {
    return `This action returns a #${id} holiday`;
  }

  update(id: number, updateHolidayDto: UpdateHolidayDto) {
    return `This action updates a #${id} holiday`;
  }

  remove(id: number) {
    return `This action removes a #${id} holiday`;
  }
}
