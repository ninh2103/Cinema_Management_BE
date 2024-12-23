import { Cinemaroom } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateCinemaroomDto {
  @IsNotEmpty()
  Name: string;

  @IsNotEmpty()
  Type: number;

  @IsNotEmpty()
  Block: number;
}

export interface CinemaRoomResponseType {
  data: Cinemaroom[];
  total: number;
  currentPage: number;
  itemPerPage: number;
}
