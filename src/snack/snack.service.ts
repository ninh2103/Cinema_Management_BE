import { Injectable } from '@nestjs/common';
import { CreateSnackDto } from './dto/create-snack.dto';
import { UpdateSnackDto } from './dto/update-snack.dto';
import { PrismaService } from 'src/prisma.services';
import {
  ClosedTypeRoomValue,
  FilterType,
  TypeSnackValue,
} from 'src/constants/type';

@Injectable()
export class SnackService {
  constructor(private prismaService: PrismaService) {}
  async create(createSnackDto: CreateSnackDto) {
    const snack = await this.prismaService.snack.create({
      data: {
        Name: createSnackDto.Name,
        Price: createSnackDto.Price,
        Block: TypeSnackValue[0],
        Photo: createSnackDto.Photo,
        Type: createSnackDto.Type,
      },
    });
    return snack;
  }

  async findAll(filter: FilterType) {
    const itemsPerPage = filter.items_per_page || 10; // Giá trị mặc định
    const page = filter.page || 1;
    const search = filter.search || '';
    const skip = (page - 1) * itemsPerPage;

    const whereCondition = {
      OR: [
        {
          Name: {
            contains: search,
          },
        },
      ],
      AND: [
        {
          Block: 0, // Lọc trạng thái Block
        },
      ],
    };
    try {
      // Sử dụng Promise.all để chạy cả hai tác vụ song song
      const [movie, totalItems] = await Promise.all([
        this.prismaService.snack.findMany({
          take: itemsPerPage,
          skip,
          where: whereCondition,
        }),
        this.prismaService.snack.count({
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
    return await this.prismaService.snack.findUniqueOrThrow({
      where: {
        Id,
      },
    });
  }

  async update(id: string, updateSnackDto: UpdateSnackDto) {
    const snack = await this.prismaService.snack.update({
      where: { Id: id },
      data: {
        ...updateSnackDto,
      },
    });

    return snack;
  }

  async remove(Id: string) {
    return await this.prismaService.snack.delete({
      where: {
        Id,
      },
    });
  }
}
