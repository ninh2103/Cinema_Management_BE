import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CinemaroomModule } from './cinemaroom/cinemaroom.module';
import { CategoryModule } from './category/category.module';
import { MovieModule } from './movie/movie.module';
import { MediaModule } from './media/media.module';
import { ShowtimeModule } from './showtime/showtime.module';
import { EnentModule } from './event/event.module';
import { PromotionModule } from './promotion/promotion.module';
import { SnackModule } from './snack/snack.module';
import { TimeSlotModule } from './time-slot/time-slot.module';
import { HolidayModule } from './holiday/holiday.module';
import { TicketPriceModule } from './ticket-price/ticket-price.module';
import { InvoiceModule } from './invoice/invoice.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    CinemaroomModule,
    CategoryModule,
    MovieModule,
    MediaModule,
    ShowtimeModule,
    EnentModule,
    PromotionModule,
    SnackModule,
    TimeSlotModule,
    HolidayModule,
    TicketPriceModule,
    InvoiceModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
