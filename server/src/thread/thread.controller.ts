import { Body, Controller, Get, Param, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { WrapAsyncInterceptor } from 'src/middlewares/wrapAsync.interceptor';

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
        const result = await this.threadService.getDetail(id);
        return {
            data: result
        }
    }

    @Post('')
    async createThread(@Body('user') user: object) {
        console.log(user);
        // const thread = req.body;
        // const username = req.user['username'];
        // const transformedThread = {
        //     ...thread,
        //     author: username,
        //     createdAt: new Date(),
        //     content: thread.content,
        // }
        // await this.threadService.createThread(transformedThread, username);
        // return {
        //     messageCode: 'Created thread',
        // };
    }
}

