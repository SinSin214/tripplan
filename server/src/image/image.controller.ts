import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('image')
export class ImageController {
    constructor(private imageService: ImageService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniquePrefix = Date.now();
                const extension = extname(file.originalname);
                // Generating a 16 random chars long string
                const randomName = Array(16).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                const fileName = `${randomName}_${uniquePrefix}${extension}`;
                callback(null, fileName);
            }
        })
    })
    )
    uploadImage(@UploadedFile() file: Express.Multer.File, @Res() res) {
        // return file.filename;
        res.send({filename: file.filename})
    }

    @Get(':id')
    getImageById(@Param('id') fileId, @Res() res) {
        res.sendFile(fileId, { root: './uploads'})
    }
}
