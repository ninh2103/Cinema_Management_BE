import {
  HttpException,
  HttpStatus,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { CreateAuthDto, RegisterAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma.services';
import { compareSync, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from 'src/utils/crypto';
import { ConfigService } from '@nestjs/config';
import { RoleType, TokenPayload } from 'src/constants/type';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  register = async (registerAuthDto: RegisterAuthDto) => {
    const user = await this.prismaService.user.findUnique({
      where: {
        Email: registerAuthDto.Email,
      },
      select: {
        Id: true,
        Email: true,
        FullName: true,
        Birthday: true,
        Gender: true,
      },
    });
    if (user) {
      throw new HttpException(
        { message: 'This email has been used' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await hash(registerAuthDto.Password, 10);

    const role = await this.prismaService.role.findUnique({
      where: { Id: registerAuthDto.Role },
    });

    if (!role) {
      throw new HttpException(
        { message: 'Invalid role' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.prismaService.user.create({
      data: {
        ...registerAuthDto,
        Password: hashPassword,
        Role: {
          connect: {
            Id: registerAuthDto.Role,
          },
        },
      },
      select: {
        Id: true,
        Email: true,
        FullName: true,
        Birthday: true,
        Gender: true,
        Role: {
          select: {
            Name: true, // Giả sử bạn muốn trả về tên quyền
          },
        },
      },
    });

    return result;
  };

  login = async (Email: string, Password: string): Promise<any> => {
    const user = await this.prismaService.user.findUnique({
      where: {
        Email: Email,
      },
      select: {
        Id: true,
        Email: true,
        FullName: true,
        Password: true, // Cần để so sánh mật khẩu
        Role: {
          select: {
            Name: true, // Lấy tên Role
          },
        },
      },
    });
    if (!user) {
      throw new HttpException(
        { message: 'Account has been used' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isCheck = await compareSync(Password, user.Password);
    if (!isCheck) {
      throw new HttpException(
        { message: 'Password has been used' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = {
      id: user.Id,
      email: user.Email,
      name: user.FullName,
      role: user.Role.Name,
    };
    const access_token = this.jwtService.sign(payload);

    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRE,
    });

    // Lưu refresh_token vào bảng RefreshToken
    await this.prismaService.refreshToken.create({
      data: {
        UserId: user.Id, // Liên kết với người dùng
        token: refresh_token, // Lưu refresh token
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Thời gian hết hạn 7 ngày
      },
    });

    return {
      user: {
        id: user.Id,
        email: user.Email,
        fullname: user.FullName,
        role: user.Role,
      },
      access_token,
      refresh_token,
    };
  };

  logoutController = async (refreshToken: string) => {
    await this.prismaService.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });
    return 'Đăng xuất thành công';
  };

  async onApplicationBootstrap() {
    await this.initOwnerAccount();
  }

  initOwnerAccount = async () => {
    const accountCount = await this.prismaService.user.count();
    if (accountCount === 0) {
      const hashedPassword = await hashPassword(
        this.configService.get<string>('INITIAL_PASSWORD_OWNER'),
      );

      const ownerRole = await this.prismaService.role.findUnique({
        where: { Name: 'Owner' }, // Đảm bảo cột `Name` tồn tại trong bảng `Role`
      });

      if (!ownerRole) {
        throw new Error(
          'Role "Owner" không tồn tại. Hãy thêm vai trò này vào trước.',
        );
      }

      await this.prismaService.user.create({
        data: {
          FullName: 'Owner',
          Email: this.configService.get<string>('INITIAL_EMAIL_OWNER'),
          Password: hashedPassword,
          Birthday: new Date('2003-03-21'),
          Gender: 'Nam',
          Role: {
            connect: {
              Id: ownerRole.Id,
            },
          },
        },
      });
      console.log('Tài khoản Owner đã được khởi tạo thành công!');
    } else {
      console.log('Tài khoản đã tồn tại. Không cần khởi tạo lại.');
    }
  };

  async refreshToken(refreshToken: string) {
    let decodedRefreshToken: TokenPayload;

    // Giải mã refresh token và lấy thông tin người dùng
    try {
      decodedRefreshToken = verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      ) as TokenPayload;
    } catch (AuthError) {
      throw new AuthError('Refresh token không hợp lệ');
    }

    // Tìm refresh token trong database và lấy thông tin người dùng liên quan
    const refreshTokenDoc =
      await this.prismaService.refreshToken.findUniqueOrThrow({
        where: {
          token: refreshToken,
        },
        include: {
          users: {
            include: {
              Role: true,
            },
          },
        },
      });

    const user = refreshTokenDoc.users;
    const role = user.Role; // Lấy thông tin role từ người dùng

    // Tạo access token mới, bao gồm userId và role name
    const newAccessToken = sign(
      {
        userId: user.Id, // ID của người dùng
        email: user.Email, // Email của người dùng
        fullName: user.FullName, // Tên đầy đủ của người dùng
        role: role.Name, // Tên của vai trò
      },
      process.env.JWT_ACCESS_SECRET, // Secret key cho access token
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRE, // Thời gian hết hạn của access token (lấy từ env)
      },
    );

    // Tạo refresh token mới, bao gồm userId và role name
    const newRefreshToken = sign(
      {
        userId: user.Id, // ID của người dùng
        email: user.Email, // Email của người dùng
        fullName: user.FullName, // Tên đầy đủ của người dùng
        role: role.Name, // Tên của vai trò
      },
      process.env.JWT_REFRESH_SECRET, // Secret key cho refresh token
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRE, // Thời gian hết hạn của refresh token (lấy từ env)
      },
    );

    // Xóa refresh token cũ khỏi database
    await this.prismaService.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });

    // Tạo mới refresh token trong database
    await this.prismaService.refreshToken.create({
      data: {
        UserId: user.Id, // Liên kết với user qua ID
        token: newRefreshToken, // Lưu token mới
        expiresAt: refreshTokenDoc.expiresAt, // Lưu thời gian hết hạn (thường giống token cũ)
      },
    });

    // Trả về access token và refresh token mới
    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
