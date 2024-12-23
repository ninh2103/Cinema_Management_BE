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
import { SnackService } from './snack.service';
import { CreateSnackDto } from './dto/create-snack.dto';
import { UpdateSnackDto } from './dto/update-snack.dto';
import { Public, ResponseMessage } from 'src/decorator/costomize';
import { FilterType } from 'src/constants/type';

@Controller('snack')
export class SnackController {
  constructor(private readonly snackService: SnackService) {}

  @Post()
  @ResponseMessage('Create Snack Success')
  create(@Body() createSnackDto: CreateSnackDto) {
    return this.snackService.create(createSnackDto);
  }

  @Get()
  @Public()
  @ResponseMessage('Get List Snack success')
  findAll(@Query() param: FilterType) {
    return this.snackService.findAll(param);
  }

  @Get(':id')
  @Public()
  @ResponseMessage('Get Snack success')
  findOne(@Param('id') id: string) {
    return this.snackService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Get Snack success')
  update(@Param('id') id: string, @Body() updateSnackDto: UpdateSnackDto) {
    return this.snackService.update(id, updateSnackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snackService.remove(id);
  }
}
