import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  NameEN: string;

  @IsNotEmpty()
  NameVN: string;

  @IsNotEmpty()
  Directors: string;

  @IsNotEmpty()
  Cast: string;

  @IsNotEmpty()
  Premiere: string;

  @IsNotEmpty()
  Time: number;

  @IsNotEmpty()
  Detail: string;

  @IsNotEmpty()
  Trailer: string;

  @IsNotEmpty()
  AgeLimit: string;

  @IsNotEmpty()
  Photo: string;

  @IsNotEmpty()
  Status: string;

  @IsNotEmpty()
  Rating: string;
}
