import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/media/multer.config';

@Module({
  controllers: [MediaController],
  providers: [MediaService],
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
})
export class MediaModule {}
