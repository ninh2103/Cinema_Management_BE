import { IsNotEmpty } from 'class-validator';

export class CreateHolidayDto {
  @IsNotEmpty()
  Date: Date;
}
