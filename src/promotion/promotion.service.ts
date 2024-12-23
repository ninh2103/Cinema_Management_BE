import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PrismaService } from 'src/prisma.services';
import { FilterType } from 'src/constants/type';

@Injectable()
export class PromotionService {
  constructor(private prismaService: PrismaService) {}
  async create(createPromotionDto: CreatePromotionDto) {
    const promotion = await this.prismaService.promotion.create({
      data: {
        Code: createPromotionDto.Code,
        DateFrom: createPromotionDto.DateFrom,
        DateTo: createPromotionDto.DateTo,
        Value: createPromotionDto.Value,
        IdEvent: createPromotionDto.IdEvent,
      },
    });
    return promotion;
  }

  async findAll(filter: FilterType) {
    const itemsPerPage = filter.items_per_page || 10; // Giá trị mặc định
    const page = filter.page || 1;
    const search = filter.search || '';
    const skip = (page - 1) * itemsPerPage;

    try {
      // Sử dụng Promise.all để chạy cả hai tác vụ song song
      const [movie, totalItems] = await Promise.all([
        this.prismaService.promotion.findMany({
          take: itemsPerPage,
          skip,
          include: {
            event: true,
          },
        }),
        this.prismaService.promotion.count(),
      ]);

      // Trả về kết quả
      return {
        data: movie,
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
    return await this.prismaService.promotion.findUniqueOrThrow({
      where: {
        Id,
      },
    });
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.prismaService.promotion.update({
      where: { Id: id },
      data: {
        ...updatePromotionDto,
      },
    });

    return promotion;
  }

  async remove(Id: string) {
    return await this.prismaService.promotion.delete({
      where: {
        Id,
      },
    });
  }
}
