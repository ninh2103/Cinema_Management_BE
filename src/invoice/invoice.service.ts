import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma.services';
import { FilterType, PaymentValue } from 'src/constants/type';

@Injectable()
export class InvoiceService {
  constructor(private prismaService: PrismaService) {}
  async create(createInvoiceDto: CreateInvoiceDto) {
    try {
      // Tạo invoice
      const invoice = await this.prismaService.invoice.create({
        data: {
          Checking: createInvoiceDto.Checking,
          Total: createInvoiceDto.Total,
          userId: createInvoiceDto.User,
          TimeBooking: createInvoiceDto.TimeBooking,
          Payment: createInvoiceDto.Payment,
          Discount: createInvoiceDto.Discount,
          TotalBill: createInvoiceDto.TotalBill,
        },
      });

      return invoice;
    } catch (error) {
      throw new Error(`Failed to create invoice: ${error.message}`);
    }
  }

  async findAll(filter: FilterType) {
    const itemsPerPage = filter.items_per_page || 10; // Giá trị mặc định
    const page = filter.page || 1;
    const search = filter.search || '';
    const skip = (page - 1) * itemsPerPage;

    const whereCondition = {
      AND: [
        {
          Checking: 1,
        },
      ],
    };

    try {
      // Sử dụng Promise.all để chạy cả hai tác vụ song song
      const [invoice, totalItems] = await Promise.all([
        this.prismaService.invoice.findMany({
          take: itemsPerPage,
          skip,
          where: whereCondition,
          include: {
            user: true,
          },
        }),
        this.prismaService.invoice.count({ where: whereCondition }),
      ]);

      // Trả về kết quả
      return {
        data: invoice,
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
    return await this.prismaService.invoice.findUniqueOrThrow({
      where: {
        Id,
      },
    });
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const ticketPrice = await this.prismaService.invoice.update({
      where: { Id: id },
      data: {
        ...updateInvoiceDto,
      },
    });

    return ticketPrice;
  }

  async remove(Id: string) {
    return await this.prismaService.invoice.delete({
      where: {
        Id,
      },
    });
  }
}
