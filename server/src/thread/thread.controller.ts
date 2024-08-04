import { Body, Controller, Get, Param, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { WrapAsyncInterceptor } from 'src/middlewares/wrapAsync.interceptor';
import { CustomRequest } from 'types';
import { addPathToImage } from 'src/utilities/imagePath';
import { FilesInterceptor } from '@nestjs/platform-express';


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
        threadDetail.creator.avatarPath = addPathToImage(threadDetail.creator.avatarFileName, process.env.AVATAR_FOLDER);
        return {
            data: threadDetail
        }
    }

    @Post('')
    @UseInterceptors(FilesInterceptor('files'))
    async createThread(@Req() request: CustomRequest) {
        const thread = JSON.parse(request.body.thread);
        const files = request.files;
        // Create thread before upload file !!!
        const username = request.user['username'];
        const transformedThread = {
            ...thread,
            author: username
        }
        const createdThread = await this.threadService.createThread(transformedThread, username);
        return {
            messageCode: 'Created thread',
            threadId: createdThread.id
        };
    }
}