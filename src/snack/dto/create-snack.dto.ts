import { IsNotEmpty } from 'class-validator';

export class CreateSnackDto {
  @IsNotEmpty()
  Name: string;

  @IsNotEmpty()
  Type: string;

  @IsNotEmpty()
  Block: number;

  @IsNotEmpty()
  Price: number;

  @IsNotEmpty()
  Photo?: string;
}
