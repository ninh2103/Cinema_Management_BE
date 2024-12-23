import { IsNotEmpty } from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  Code: string; // Mã khuyến mãi

  @IsNotEmpty()
  Value: number; // Giá trị khuyến mãi (phần trăm hoặc tiền)

  @IsNotEmpty()
  DateFrom: string; // Ngày bắt đầu khuyến mãi

  @IsNotEmpty()
  DateTo: string; // Ngày kết thúc khuyến mãi

  @IsNotEmpty()
  IdEvent: string; // ID sự kiện liên quan tới khuyến mã
}
