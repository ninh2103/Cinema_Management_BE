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
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Public, ResponseMessage } from 'src/decorator/costomize';
import { FilterType } from 'src/constants/type';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  @ResponseMessage('Create Promotion Success')
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.create(createPromotionDto);
  }

  @Get()
  @Public()
  @ResponseMessage('Get All Promotion success')
  findAll(@Query() param: FilterType) {
    return this.promotionService.findAll(param);
  }

  @Get(':id')
  @Public()
  @ResponseMessage('Get All Promotion success')
  findOne(@Param('id') id: string) {
    return this.promotionService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update Promotion success')
  update(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    return this.promotionService.update(id, updatePromotionDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete Promotion success')
  remove(@Param('id') id: string) {
    return this.promotionService.remove(id);
  }
}
