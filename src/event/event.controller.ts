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
import { EnentService } from './event.service';
import { CreateEnentDto } from './dto/create-event.dto';
import { UpdateEnentDto } from './dto/update-event.dto';
import { Public, ResponseMessage } from 'src/decorator/costomize';
import { FilterType } from 'src/constants/type';

@Controller('event')
export class EnentController {
  constructor(private readonly enentService: EnentService) {}

  @Post()
  @ResponseMessage('Create Event Success')
  create(@Body() createEnentDto: CreateEnentDto) {
    return this.enentService.create(createEnentDto);
  }

  @Get()
  @ResponseMessage('Get All Event success')
  @Public()
  findAll(@Query() param: FilterType) {
    return this.enentService.findAll(param);
  }

  @Get(':id')
  @ResponseMessage('Get Event success')
  @Public()
  findOne(@Param('id') id: string) {
    return this.enentService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update Event success')
  update(@Param('id') id: string, @Body() updateEnentDto: UpdateEnentDto) {
    return this.enentService.update(id, updateEnentDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete Event success')
  remove(@Param('id') id: string) {
    return this.enentService.remove(id);
  }
}
