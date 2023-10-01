import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@Controller('image')
export class ImageController {
    constructor() {}

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
    uploadImage(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        // return file.filename;
        res.status(200).send({filename: file.filename})
    }

    @Get(':id')
    getImageById(@Param('id') fileId, @Res() res: Response) {
        res.status(200).sendFile(fileId, { root: './uploads'});
    }
}
