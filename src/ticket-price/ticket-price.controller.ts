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
import { TicketPriceService } from './ticket-price.service';
import { CreateTicketPriceDto } from './dto/create-ticket-price.dto';
import { UpdateTicketPriceDto } from './dto/update-ticket-price.dto';
import { Public, ResponseMessage } from 'src/decorator/costomize';
import { FilterType } from 'src/constants/type';

@Controller('ticket-price')
export class TicketPriceController {
  constructor(private readonly ticketPriceService: TicketPriceService) {}

  @Post()
  @ResponseMessage('Create TicketPrice success')
  create(@Body() createTicketPriceDto: CreateTicketPriceDto) {
    return this.ticketPriceService.create(createTicketPriceDto);
  }

  @Get()
  @Public()
  @ResponseMessage('Get TicketPrice success')
  findAll(@Query() param: FilterType) {
    return this.ticketPriceService.findAll(param);
  }

  @Get(':id')
  @Public()
  @ResponseMessage('Get TicketPrice success')
  findOne(@Param('id') id: string) {
    return this.ticketPriceService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update TicketPrice success')
  update(
    @Param('id') id: string,
    @Body() updateTicketPriceDto: UpdateTicketPriceDto,
  ) {
    return this.ticketPriceService.update(id, updateTicketPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketPriceService.remove(id);
  }
}
