import { IsNotEmpty } from 'class-validator';

export class CreateTimeSlotDto {
  @IsNotEmpty()
  StartTime: string;

  @IsNotEmpty()
  EndTime: string;
}
