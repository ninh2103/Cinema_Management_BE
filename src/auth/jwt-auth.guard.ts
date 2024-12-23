import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorator/costomize';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err) {
      throw new UnauthorizedException(
        'Lỗi xác thực hệ thống. Vui lòng thử lại.',
      );
    }

    if (!user) {
      // Thông báo lỗi khi không tìm thấy user
      if (info && info.message === 'No auth token') {
        throw new UnauthorizedException('Token xác thực không được cung cấp.');
      } else if (info && info.message === 'jwt expired') {
        throw new UnauthorizedException(
          'Token đã hết hạn. Vui lòng đăng nhập lại.',
        );
      } else {
        throw new UnauthorizedException(
          'Xác thực thất bại. Vui lòng kiểm tra lại token.',
        );
      }
    }

    // Nếu user không có quyền truy cập, bạn có thể sử dụng ForbiddenException
    if (!this.isUserAuthorized(user)) {
      throw new ForbiddenException(
        'Bạn không có quyền truy cập vào tài nguyên này.',
      );
    }

    return user; // Nếu không có lỗi, trả về user
  }

  private isUserAuthorized(user: any): boolean {
    // Thêm logic kiểm tra quyền người dùng nếu cần
    return true;
  }
}
