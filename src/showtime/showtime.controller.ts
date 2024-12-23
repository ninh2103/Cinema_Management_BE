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
import { ShowtimeService } from './showtime.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { Public, ResponseMessage } from 'src/decorator/costomize';
import { FilterType } from 'src/constants/type';

@Controller('showtime')
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) {}

  @Post()
  @ResponseMessage('Create ShowTime Success')
  create(@Body() createShowtimeDto: CreateShowtimeDto) {
    return this.showtimeService.create(createShowtimeDto);
  }

  @Get()
  @ResponseMessage('Get All ShowTime success')
  @Public()
  findAll(@Query() param: FilterType) {
    return this.showtimeService.findAll(param);
  }

  @Get(':id')
  @ResponseMessage('Get ShowTime success')
  @Public()
  findOne(@Param('id') id: string) {
    return this.showtimeService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update ShowTime success')
  update(
    @Param('id') id: string,
    @Body() updateShowtimeDto: UpdateShowtimeDto,
  ) {
    return this.showtimeService.update(id, updateShowtimeDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete ShowTime success')
  remove(@Param('id') id: string) {
    return this.showtimeService.remove(id);
  }
}
