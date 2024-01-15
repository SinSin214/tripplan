import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { supabase } from '../main';

@Controller('image')
export class ImageController {
    constructor() {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        try {
            const uploadedTime = (new Date()).getTime();
            const fileName = `${uploadedTime}_${file.originalname}`;
            const { data, error } = await supabase.storage
                .from('ImageStorage')
                .upload(`ThreadImage/${fileName}`, file.buffer);
            if(error) {
                return res.status(500).send({
                    message: `Supabase: ${error.message}`,
                    error: error['error']
                });
            } else {
                const filePath = data.path;
                const retriveResponse = supabase.storage
                    .from('ImageStorage')
                    .getPublicUrl(filePath);
                return res.status(200).send({
                    filePath: retriveResponse.data.publicUrl,
                    fileName: fileName
                });
            }
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }

    @Get(':id')
    getImageById(@Param('id') fileId, @Res() res: Response) {
        res.status(200).sendFile(fileId, { root: './uploads'});
    }
}
