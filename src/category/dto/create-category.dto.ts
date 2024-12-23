import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  Title: string;

  @IsNotEmpty()
  Slug: string;
}
