import { Body, Controller, Get, Param, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { WrapAsyncInterceptor } from 'src/middlewares/wrapAsync.interceptor';
import { CustomRequest } from 'types';
import { addPathToImage } from 'src/utilities/imagePath';
import { FilesInterceptor } from '@nestjs/platform-express';
import { supabase } from 'src/main';


@UseInterceptors(new WrapAsyncInterceptor())
@Controller('thread')
export class ThreadController {
    constructor(private threadService: ThreadService) {}

    @Post('all')
    async getThreadAll() {
        const result = await this.threadService.getThreadAll();
        return {
            data: result
        };
    }

    @Get('highlights')
    async getHighlights() {
        const result = await this.threadService.getHighlights();
        return {
            data: result
        }
    }

    // always put at bottom
    @Get(':id')
    async getThreadDetail(@Param('id') id: string) {
        const threadDetail = await this.threadService.getDetail(id);
        threadDetail.creator.avatarPath = addPathToImage(threadDetail.creator.avatarFileName, process.env.AVATAR_FOLDER_NAME);
        return {
            data: threadDetail
        }
    }

    @Post('')
    @UseInterceptors(FilesInterceptor('files'))
    async createThread(@Req() req: CustomRequest) {
        const thread = req.body;
        const files = req.files as Express.Multer.File[];
        const username = req.user['username'];
        
        const fileNames = [];
        const uploadedTime = (new Date()).getTime();
        const imageStorage = process.env.IMAGE_STORAGE;

        const allImageNames = thread.allImageNames;
        const promises = [];

        for(let i = 0; i < allImageNames.length; i++) {
            const imageName = allImageNames[i];
            const fromPath = `${process.env.TEMP_THREAD_IMAGE_FOLDER_NAME}/${imageName}`;
            const toPath = `${process.env.THREAD_IMAGE_FOLDER_NAME}/${imageName}`;

            promises.push(supabase.storage.from(imageStorage).move(fromPath, toPath));
        };

        await Promise.all(promises);
         
        // const createdThread = await this.threadService.createThread(thread, username);

        return {
            messageCode: 'createdThread',
            data: {
                threadId: 'ok'
            }
        };
    }
}