import { IsEmail, IsIn, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  FullName: string;

  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @IsNotEmpty()
  Password: string;

  @IsNotEmpty()
  @MinLength(6)
  Birthday: Date;

  @IsNotEmpty()
  Gender: string;

  @IsNotEmpty()
  Role: string; // Vẫn là string vì Prisma yêu cầu kiểu này
}

export class LoginAuthDto {
  @IsNotEmpty()
  Password: string;

  @IsEmail()
  @IsNotEmpty()
  Email: string;
}
