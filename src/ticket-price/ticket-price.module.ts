import { Module } from '@nestjs/common';
import { TicketPriceService } from './ticket-price.service';
import { TicketPriceController } from './ticket-price.controller';
import { PrismaService } from 'src/prisma.services';

@Module({
  controllers: [TicketPriceController],
  providers: [TicketPriceService, PrismaService],
})
export class TicketPriceModule {}
