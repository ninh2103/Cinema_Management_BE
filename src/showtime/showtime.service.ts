import { Injectable } from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { PrismaService } from 'src/prisma.services';
import { ClosedTypeRoomValue, FilterType } from 'src/constants/type';

@Injectable()
export class ShowtimeService {
  constructor(private prismaService: PrismaService) {}
  async create(createShowtimeDto: CreateShowtimeDto) {
    const movie = await this.prismaService.showtime.create({
      data: {
        Date: createShowtimeDto.Date,
        TimeEnd: createShowtimeDto.TimeEnd,
        TimeStart: createShowtimeDto.TimeStart,
        Closed: ClosedTypeRoomValue[0],
        IdFilm: createShowtimeDto.IdFilm,
        IdRoom: createShowtimeDto.IdRoom,
      },
    });
    return movie;
  }

  async findAll(filter: FilterType) {
    const itemsPerPage = filter.items_per_page || 10; // Giá trị mặc định
    const page = filter.page || 1;
    const search = filter.search || '';
    const skip = (page - 1) * itemsPerPage;

    const whereCondition = {
      AND: [
        {
          Closed: 0, // Lọc trạng thái Block
        },
      ],
    };

    try {
      // Sử dụng Promise.all để chạy cả hai tác vụ song song
      const [movie, totalItems] = await Promise.all([
        this.prismaService.showtime.findMany({
          take: itemsPerPage,
          skip,
          where: whereCondition,
          include: {
            movie: true,
            room: true,
          },
        }),
        this.prismaService.showtime.count({
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
    return await this.prismaService.showtime.findUniqueOrThrow({
      where: {
        Id,
      },
    });
  }

  async update(id: string, updateShowtimeDto: UpdateShowtimeDto) {
    const showtime = await this.prismaService.showtime.update({
      where: { Id: id },
      data: {
        ...updateShowtimeDto,
      },
    });

    return showtime;
  }

  async remove(Id: string) {
    return await this.prismaService.showtime.delete({
      where: {
        Id,
      },
    });
  }
}
