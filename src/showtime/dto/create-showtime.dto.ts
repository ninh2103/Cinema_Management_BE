import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateShowtimeDto {
  @IsNotEmpty()
  @IsDateString()
  Date: Date; // Ngày chiếu (ISO 8601 string)

  @IsNotEmpty()
  @IsString()
  TimeStart: string; // Thời gian bắt đầu (string)

  @IsNotEmpty()
  @IsString()
  TimeEnd: string; // Thời gian kết thúc (string)

  @IsNotEmpty()
  @IsString()
  IdFilm: string; // Mã phim (sử dụng mã phim đã có trong bảng Movie)

  @IsNotEmpty()
  @IsString()
  IdRoom: string; // Mã phòng (sử dụng mã phòng đã có trong bảng Cinemaroom)

  @IsOptional()
  @IsInt()
  Closed?: number; // Tình trạng suất chiếu (0 hoặc 1, có thể bỏ qua khi tạo mới)
}
