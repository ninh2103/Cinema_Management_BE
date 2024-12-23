import { Injectable } from '@nestjs/common';
import fs from 'fs';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { join } from 'path';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  getRootPath = () => {
    return process.cwd();
  };

  ensureExists(targetDirectory: string) {
    try {
      fs.mkdirSync(targetDirectory, { recursive: true });
      console.log('Directory successfully created, or it already exists.');
    } catch (error) {
      if (error.code !== 'EEXIST') {
        console.error('Error creating directory:', error);
      }
    }
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const folderType = req?.headers?.folder_type ?? 'default';

          // Check file type to determine folder (image or video)
          const fileMimeType = file.mimetype;

          let subFolder = 'others';
          if (fileMimeType.startsWith('image')) {
            subFolder = 'images';
          } else if (fileMimeType.startsWith('video')) {
            subFolder = 'videos';
          }

          const folderPath = `public/${subFolder}/${folderType}`;
          this.ensureExists(folderPath);
          cb(null, join(this.getRootPath(), folderPath));
        },
        filename: (req, file, cb) => {
          // Get image or video extension
          const extName = path.extname(file.originalname);

          // Get file's name without extension
          const baseName = path.basename(file.originalname, extName);

          const finalName = `${baseName}-${Date.now()}${extName}`;
          cb(null, finalName);
        },
      }),
    };
  }
}
