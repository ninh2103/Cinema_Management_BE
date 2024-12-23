import { IsOptional, IsString, IsEmail, IsDateString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  FullName?: string;

  @IsOptional()
  @IsEmail()
  Email?: string;

  @IsOptional()
  @IsString()
  Password?: string; // Nếu cho phép người dùng đổi mật khẩu

  @IsOptional()
  @IsDateString()
  Birthday?: Date;

  @IsOptional()
  @IsString()
  Gender?: string;

  @IsOptional()
  @IsString()
  Phone?: string;

  @IsOptional()
  @IsString()
  Photo?: string;

  @IsOptional()
  @IsString()
  UserStatus?: string;

  @IsOptional()
  @IsString()
  roleId?: string; // Nếu muốn thay đổi vai trò người dùng
}
