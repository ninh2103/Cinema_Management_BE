import { Injectable } from '@nestjs/common';
import { CreateEnentDto } from './dto/create-event.dto';
import { UpdateEnentDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma.services';
import { FilterType } from 'src/constants/type';

@Injectable()
export class EnentService {
  constructor(private prismaService: PrismaService) {}
  async create(createEnentDto: CreateEnentDto) {
    const event = await this.prismaService.event.create({
      data: {
        Time: createEnentDto.time,
        Slug: createEnentDto.slug,
        Author: createEnentDto.author,
        Content: createEnentDto.content,
        Photo: createEnentDto.photo,
        Title: createEnentDto.title,
      },
    });
    return event;
  }

  async findAll(filter: FilterType) {
    const itemsPerPage = filter.items_per_page || 10; // Giá trị mặc định
    const page = filter.page || 1;
    const search = filter.search || '';
    const skip = (page - 1) * itemsPerPage;

    const whereCondition = {
      OR: [
        {
          Title: {
            contains: search,
          },
        },
        {
          Author: {
            contains: search,
          },
        },
      ],
    };
    try {
      // Sử dụng Promise.all để chạy cả hai tác vụ song song
      const [movie, totalItems] = await Promise.all([
        this.prismaService.event.findMany({
          take: itemsPerPage,
          skip,
          where: whereCondition,
        }),
        this.prismaService.event.count({
          where: whereCondition,
        }),
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
    return await this.prismaService.event.findUniqueOrThrow({
      where: {
        Id,
      },
    });
  }

  async update(id: string, updateEnentDto: UpdateEnentDto) {
    const event = await this.prismaService.event.update({
      where: { Id: id },
      data: {
        ...updateEnentDto,
      },
    });

    return event;
  }

  async remove(Id: string) {
    return await this.prismaService.event.delete({
      where: {
        Id,
      },
    });
  }
}
