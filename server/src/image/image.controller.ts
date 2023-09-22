import { Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('image')
export class ImageController {
    constructor(private imageService: ImageService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: '../../upload',
            filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                // Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}_${extname(file.originalname)}`)
              }
        })
    }))
    async uploadImage(@UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 1000 }),
            new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })
        ],
      })) file) {
        console.log(file);
    }
}
