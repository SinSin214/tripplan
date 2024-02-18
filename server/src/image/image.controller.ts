import { Controller, Get, Param, Post, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { supabase } from '../main';

@Controller('image')
export class ImageController {
    constructor() {}

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadImage(@UploadedFiles() files:  Array<Express.Multer.File>, @Res() res: Response) {
        try {
            // ??? Save to server first, then storage later
            // ??? Create cronjob to clear images on server
            const uploadedTime = (new Date()).getTime();
            let retriveFiles = [];
            for(let i = 0; i < files.length; i++) {
                let file = files[i];
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
                    retriveFiles.push({
                        filePath: retriveResponse.data.publicUrl,
                        fileName: fileName
                    })
                }
            }

            return res.status(200).send({
                filesInfo: retriveFiles
            });
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
