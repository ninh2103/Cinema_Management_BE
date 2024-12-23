import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { PrismaService } from 'src/prisma.services';

@Module({
  controllers: [PromotionController],
  providers: [PromotionService, PrismaService],
})
export class PromotionModule {}
