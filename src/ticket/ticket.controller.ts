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
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Public, ResponseMessage } from 'src/decorator/costomize';
import { FilterType } from 'src/constants/type';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @ResponseMessage('Create Ticket Success')
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  @Public()
  @ResponseMessage('Get All Ticket success')
  findAll(@Query() param: FilterType) {
    return this.ticketService.findAll(param);
  }

  @Get(':id')
  @Public()
  @ResponseMessage('Get Ticket success')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update Ticket success')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete Ticket success')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(id);
  }
}
