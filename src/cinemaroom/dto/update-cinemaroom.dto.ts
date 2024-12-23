import { PartialType } from '@nestjs/mapped-types';
import { CreateCinemaroomDto } from './create-cinemaroom.dto';

export class UpdateCinemaroomDto extends PartialType(CreateCinemaroomDto) {}
