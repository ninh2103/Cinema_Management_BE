import { Injectable } from '@nestjs/common';
import { CreateTicketPriceDto } from './dto/create-ticket-price.dto';
import { UpdateTicketPriceDto } from './dto/update-ticket-price.dto';
import { PrismaService } from 'src/prisma.services';
import { FilterType } from 'src/constants/type';

@Injectable()
export class TicketPriceService {
  constructor(private prismaService: PrismaService) {}
  async create(createTicketPriceDto: CreateTicketPriceDto) {
    const ticketPrice = await this.prismaService.ticketPrice.create({
      data: {
        Price: createTicketPriceDto.Price,
        Type: createTicketPriceDto.Type,
      },
    });
    return ticketPrice;
  }

  async findAll(filter: FilterType) {
    const itemsPerPage = filter.items_per_page || 10; // Giá trị mặc định
    const page = filter.page || 1;
    const search = filter.search || '';
    const skip = (page - 1) * itemsPerPage;

    try {
      // Sử dụng Promise.all để chạy cả hai tác vụ song song
      const [ticketPrice, totalItems] = await Promise.all([
        this.prismaService.ticketPrice.findMany({
          take: itemsPerPage,
          skip,
        }),
        this.prismaService.ticketPrice.count({}),
      ]);

      // Trả về kết quả
      return {
        data: ticketPrice,
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
    return await this.prismaService.ticketPrice.findUniqueOrThrow({
      where: {
        Id,
      },
    });
  }

  async update(id: string, updateTicketPriceDto: UpdateTicketPriceDto) {
    const ticketPrice = await this.prismaService.ticketPrice.update({
      where: { Id: id },
      data: {
        ...updateTicketPriceDto,
      },
    });

    return ticketPrice;
  }

  async remove(Id: string) {
    return await this.prismaService.ticketPrice.delete({
      where: {
        Id,
      },
    });
  }
}
