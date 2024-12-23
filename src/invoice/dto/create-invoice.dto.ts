import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  Checking: number; // Tình trạng sử dụng hóa đơn

  @IsNotEmpty()
  Total: number; // Giá hóa đơn

  @IsNotEmpty()
  User: string; // Tài khoản người dùng

  @IsNotEmpty()
  TimeBooking: string; // Ngày giờ đặt vé (ISO 8601)

  @IsNotEmpty()
  Payment: number; // Tình trạng thanh toán hóa đơn

  @IsNotEmpty()
  Discount: number; // Tình trạng khuyến mãi của hóa đơn

  @IsNotEmpty()
  TotalBill: number; // Tổng tiền của hóa đơn
}
