import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.services';
import { FilterType } from 'src/constants/type';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prismaService.category.create({
      data: {
        Title: createCategoryDto.Title,
        Slug: createCategoryDto.Slug,
      },
    });

    return category;
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
      ],
    };

    try {
      // Sử dụng Promise.all để chạy cả hai tác vụ song song
      const [category, totalItems] = await Promise.all([
        this.prismaService.category.findMany({
          take: itemsPerPage,
          skip,
          where: whereCondition,
        }),
        this.prismaService.category.count({
          where: whereCondition,
        }),
      ]);

      // Trả về kết quả
      return {
        data: category,
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
    return await this.prismaService.category.findUniqueOrThrow({
      where: {
        Id,
      },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updatedCinemaRoom = await this.prismaService.category.update({
      where: { Id: id },
      data: {
        ...updateCategoryDto,
      },
    });

    return updatedCinemaRoom;
  }

  async remove(Id: string) {
    return await this.prismaService.category.delete({
      where: {
        Id,
      },
    });
  }
}
