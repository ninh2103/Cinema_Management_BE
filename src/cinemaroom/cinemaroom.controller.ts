import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CinemaroomService } from './cinemaroom.service';
import { CreateCinemaroomDto } from './dto/create-cinemaroom.dto';
import { Public, ResponseMessage } from 'src/decorator/costomize';
import { FilterType } from 'src/constants/type';

@Controller('cinemaroom')
export class CinemaroomController {
  constructor(private readonly cinemaroomService: CinemaroomService) {}

  @Post()
  @ResponseMessage('Create CinemaRoom success')
  create(@Body() createCinemaroomDto: CreateCinemaroomDto) {
    return this.cinemaroomService.create(createCinemaroomDto);
  }

  @Get()
  @Public()
  @ResponseMessage('Get List CinemaRoom success')
  findAll(@Query() param: FilterType) {
    return this.cinemaroomService.findAll(param);
  }

  @Get(':id')
  @Public()
  @ResponseMessage('Get CinemaRoom success')
  findOne(@Param('id') id: string) {
    return this.cinemaroomService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update CinemaRoom success')
  update(
    @Param('id') id: string,
    @Body() createCinemaroomDto: CreateCinemaroomDto,
  ) {
    return this.cinemaroomService.update(id, createCinemaroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cinemaroomService.remove(id);
  }
}
