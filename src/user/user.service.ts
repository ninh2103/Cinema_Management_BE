import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { compareSync } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { comparePassword, hashPassword } from 'src/utils/crypto';
import { PrismaService } from 'src/prisma.services';
import { ChangePasswordBodyType, FilterType, Role } from 'src/constants/type';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hashPassword(createUserDto.Password);

    const existingUser = await this.prismaService.user.findUnique({
      where: {
        Email: createUserDto.Email, // Tìm người dùng theo email
      },
    });

    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng.'); // Ném lỗi nếu email tồn tại
    }

    const accountEmployee = await this.prismaService.user.create({
      data: {
        FullName: createUserDto.FullName,
        Email: createUserDto.Email,
        Password: hashedPassword,
        Birthday: createUserDto.Birthday,
        Gender: createUserDto.Gender,
        Role: {
          connect: {
            Name: 'Employee', // ID của Role đã tồn tại
          },
        },
      },
      include: {
        Role: true, // Bao gồm chi tiết bảng Role
      },
    });
    return accountEmployee;
  }

  async findAll(filter: FilterType) {
    const itemsPerPage = filter.items_per_page || 10; // Giá trị mặc định
    const page = filter.page || 1;
    const search = filter.search || '';
    const skip = (page - 1) * itemsPerPage;

    const whereCondition = {
      AND: [
        {
          Role: {
            Name: 'Employee', // Lọc theo tên role là "Employee"
          },
        },
        {
          FullName: {
            contains: search, // Tìm kiếm theo tên nhân viên (nếu có từ khóa)
          },
        },
      ],
    };

    try {
      // Sử dụng Promise.all để chạy cả hai tác vụ song song
      const [users, totalItems] = await Promise.all([
        this.prismaService.user.findMany({
          take: itemsPerPage,
          skip,
          where: whereCondition,
          include: {
            Role: true,
          },
        }),
        this.prismaService.user.count({
          where: whereCondition,
        }),
      ]);

      // Trả về kết quả
      return {
        data: users,
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
    return await this.prismaService.user.findUniqueOrThrow({
      where: {
        Id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prismaService.user.update({
      where: { Id: id },
      data: {
        ...updateUserDto,
      },
      include: {
        Role: true,
      },
    });

    return updatedUser;
  }

  async remove(Id: string) {
    return await this.prismaService.user.delete({
      where: {
        Id,
      },
    });
  }

  async findCustomersByDate(
    startDate: string,
    endDate: string,
    filter: FilterType,
  ) {
    const itemsPerPage = filter.items_per_page || 10; // Giá trị mặc định
    const page = filter.page || 1;
    const search = filter.search || '';
    const skip = (page - 1) * itemsPerPage;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Sử dụng Prisma để tìm danh sách khách hàng
    const customers = await this.prismaService.user.findMany({
      where: {
        AND: [
          {
            CreatedAt: {
              gte: start,
              lte: end, // Lớn hơn hoặc bằng ngày bắt đầu
            },
          },
          {
            Role: {
              Name: 'Customer', // Chỉ lấy những người dùng có vai trò là "Customer"
            },
          },
        ],
      },
      include: {
        Role: true, // Bao gồm thông tin vai trò nếu cần
      },
    });

    const totalItems = await this.prismaService.user.count({
      where: {
        AND: [
          {
            CreatedAt: {
              gte: start,
              lte: end, // Lớn hơn hoặc bằng ngày bắt đầu
            },
          },
          {
            Role: {
              Name: 'Customer', // Chỉ lấy những người dùng có vai trò là "Customer"
            },
          },
        ],
      },
    });

    return {
      data: customers,
      meta: {
        totalItems, // Tổng số phòng chiếu
        currentPage: page, // Trang hiện tại
        itemsPerPage, // Số bản ghi/trang
        totalPages: Math.ceil(totalItems / itemsPerPage), // Tổng số trang
      },
    };
  }

  async changePassword(userId: string, body: ChangePasswordBodyType) {
    const account = await this.prismaService.user.findUniqueOrThrow({
      where: {
        Id: userId,
      },
    });
    const isSame = await comparePassword(body.oldPassword, account.Password);

    if (!isSame) {
      throw new HttpException(
        'Old password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await hashPassword(body.password);
    const newAccount = await this.prismaService.user.update({
      where: {
        Id: userId,
      },
      data: {
        Password: hashedPassword,
      },
    });
    return newAccount;
  }
}
