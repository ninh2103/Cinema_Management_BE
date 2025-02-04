import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEnentDto {
  @IsNotEmpty()
  Title: string;

  @IsNotEmpty()
  Slug: string;

  @IsNotEmpty()
  Content: string;

  @IsNotEmpty()
  Photo: string;

  @IsNotEmpty()
  Author: string;

  @IsNotEmpty()
  Time: Date;
}
