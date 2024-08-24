import { Controller, Get, Param, Post, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { supabase } from '../main';
import { WrapAsyncInterceptor } from 'src/middlewares/wrapAsync.interceptor';

@UseInterceptors(new WrapAsyncInterceptor())
@Controller('image')
export class ImageController {
    constructor() {}

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadImage(@UploadedFiles() files:  Array<Express.Multer.File>) {
        const uploadedTime = (new Date()).getTime();
        const imageStorage = process.env.IMAGE_STORAGE;
        const tempThreadImage = process.env.TEMP_THREAD_IMAGE_FOLDER_NAME;
        const retriveFiles = [];
        
        for(let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileName = `${uploadedTime}_${file.originalname}`;
            const { data, error } = await supabase.storage
                .from(`${imageStorage}`)
                .upload(`${tempThreadImage}/${fileName}`, file.buffer);
            if(error) {
                throw new Error(`Supabase: ${error.message}`)
            } else {
                const filePath = data.path;
                const retriveResponse = await supabase.storage
                    .from(`${imageStorage}`)
                    .getPublicUrl(filePath);
                retriveFiles.push({
                    filePath: retriveResponse.data.publicUrl,
                    fileName: fileName
                })
            }
        }
        return {
            filesInfo: retriveFiles
        }
    }

    @Get(':id')
    getImageById(@Param('id') fileId, @Res() res: Response) {
        res.status(200).sendFile(fileId, { root: './uploads'});
    }
}
