import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEnentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  photo: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  time: Date;
}
