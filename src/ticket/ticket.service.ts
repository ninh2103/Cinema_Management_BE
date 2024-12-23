import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma.services';
import { FilterType } from 'src/constants/type';

@Injectable()
export class TicketService {
  constructor(private prismaService: PrismaService) {}
  async create(createTicketDto: CreateTicketDto) {
    const ticket = await this.prismaService.ticket.create({
      data: {
        Name: createTicketDto.Name,
        Price: createTicketDto.Price,
        available: createTicketDto.available,
        IdShowtime: createTicketDto.IdShowtime,
      },
    });
    return ticket;
  }

  async findAll(filter: FilterType) {
    const itemsPerPage = filter.items_per_page || 10; // Giá trị mặc định
    const page = filter.page || 1;
    const search = filter.search || '';
    const skip = (page - 1) * itemsPerPage;

    const whereCondition = {
      AND: [
        {
          available: 2, // Lọc trạng thái Block
        },
      ],
    };

    try {
      // Sử dụng Promise.all để chạy cả hai tác vụ song song
      const [ticket, totalItems] = await Promise.all([
        this.prismaService.ticket.findMany({
          take: itemsPerPage,
          skip,
          where: whereCondition,
          include: {
            showtime: true,
          },
        }),
        this.prismaService.ticket.count({ where: whereCondition }),
      ]);

      // Trả về kết quả
      return {
        data: ticket,
        meta: {
          totalItems, // Tổng số phòng chiếu
          currentPage: page, // Trang hiện tại
          itemsPerPage, // Số bản ghi/trang
          totalPages: Math.ceil(totalItems / itemsPerPage), // Tổng số trang
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch cinema rooms: ${error.message}`);
    }
  }

  async findOne(Id: string) {
    return await this.prismaService.ticket.findUniqueOrThrow({
      where: {
        Id,
      },
      include: {
        showtime: true,
      },
    });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.prismaService.ticket.update({
      where: { Id: id },
      data: {
        ...updateTicketDto,
      },
    });

    return ticket;
  }

  async remove(Id: string) {
    return await this.prismaService.ticket.delete({
      where: {
        Id,
      },
    });
  }
}
