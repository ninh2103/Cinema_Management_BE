import { Injectable } from '@nestjs/common';
import { UpdateCinemaroomDto } from './dto/update-cinemaroom.dto';
import { PrismaService } from 'src/prisma.services';
import { CreateCinemaroomDto } from 'src/cinemaroom/dto/create-cinemaroom.dto';
import {
  BlockCinemaRoom,
  CinemaTypeRoomValue,
  FilterType,
} from 'src/constants/type';

@Injectable()
export class CinemaroomService {
  constructor(private prismaService: PrismaService) {}
  async create(createCinemaroomDto: CreateCinemaroomDto) {
    const cinemaRoom = await this.prismaService.cinemaroom.create({
      data: {
        Name: createCinemaroomDto.Name,
        Block: createCinemaroomDto.Block,
        Type: createCinemaroomDto.Type,
      },
    });

    return cinemaRoom;
  }

  async findAll(filter: FilterType) {
    const itemsPerPage = filter.items_per_page || 10; // Giá trị mặc định
    const page = filter.page || 1;
    const search = filter.search || '';
    const skip = (page - 1) * itemsPerPage;

    // Tái sử dụng where condition
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
      const [cinemaRooms, totalItems] = await Promise.all([
        this.prismaService.cinemaroom.findMany({
          take: itemsPerPage,
          skip,
          where: whereCondition,
        }),
        this.prismaService.cinemaroom.count({
          where: whereCondition,
        }),
      ]);

      // Trả về kết quả
      return {
        data: cinemaRooms,
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
    return await this.prismaService.cinemaroom.findUniqueOrThrow({
      where: {
        Id,
      },
    });
  }

  async update(id: string, createCinemaroomDto: CreateCinemaroomDto) {
    const updatedCinemaRoom = await this.prismaService.cinemaroom.update({
      where: { Id: id },
      data: {
        Name: createCinemaroomDto.Name,
        Block: createCinemaroomDto.Block,
        Type: createCinemaroomDto.Type,
      },
    });

    return updatedCinemaRoom;
  }

  async remove(Id: string) {
    return await this.prismaService.cinemaroom.delete({
      where: {
        Id,
      },
    });
  }
}
