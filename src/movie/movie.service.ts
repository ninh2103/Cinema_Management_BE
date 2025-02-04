import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma.services';
import { FilterType } from 'src/constants/type';

@Injectable()
export class MovieService {
  constructor(private prismaService: PrismaService) {}
  async create(createMovieDto: CreateMovieDto) {
    const movie = await this.prismaService.movie.create({
      data: {
        NameEN: createMovieDto.NameEN,
        NameVN: createMovieDto.NameVN,
        AgeLimit: createMovieDto.AgeLimit,
        Cast: createMovieDto.Cast,
        Detail: createMovieDto.Detail,
        Directors: createMovieDto.Directors,
        Photo: createMovieDto.Photo,
        Premiere: createMovieDto.Premiere,
        Rating: createMovieDto.Rating,
        Status: createMovieDto.Status,
        Time: createMovieDto.Time,
        Trailer: createMovieDto.Trailer,
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
      OR: [
        {
          NameVN: {
            contains: search,
          },
        },
        {
          NameEN: {
            contains: search,
          },
        },
      ],
    };

    try {
      // Sử dụng Promise.all để chạy cả hai tác vụ song song
      const [movies, totalItems] = await Promise.all([
        this.prismaService.movie.findMany({
          take: itemsPerPage,
          skip,
          where: whereCondition,
          include: {
            showtimes: {
              include: {
                room: true, // Lấy thông tin phòng chiếu kèm theo
              },
            },
          },
        }),
        this.prismaService.movie.count({
          where: whereCondition,
        }),
      ]);

      // Trả về kết quả
      return {
        data: movies,
        meta: {
          totalItems, // Tổng số phòng chiếu
          currentPage: page, // Trang hiện tại
          itemsPerPage, // Số bản ghi/trang
          totalPages: Math.ceil(totalItems / itemsPerPage), // Tổng số trang
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch movies: ${error.message}`);
    }
  }

  async findOne(Id: string) {
    return await this.prismaService.movie.findUniqueOrThrow({
      where: {
        Id,
      },
    });
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.prismaService.movie.update({
      where: { Id: id },
      data: {
        ...updateMovieDto,
      },
    });

    return movie;
  }

  async remove(Id: string) {
    return await this.prismaService.movie.delete({
      where: {
        Id,
      },
    });
  }
}
