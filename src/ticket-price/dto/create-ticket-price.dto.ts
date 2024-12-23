import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTicketPriceDto {
  @IsNotEmpty()
  Type: string; // Loại giá vé

  @IsNotEmpty()
  Price: number; // Giá vé
}
