import { IsNotEmpty } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  Name: string;

  @IsNotEmpty()
  Price: number;

  @IsNotEmpty()
  available: number;

  @IsNotEmpty()
  IdShowtime: string; // Mã suất chiếu
}
