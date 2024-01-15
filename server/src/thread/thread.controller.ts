import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { Request, Response } from 'express';
import { CreateThreadDto } from './thread.dto';

@Controller('thread')
export class ThreadController {
    constructor(private threadService: ThreadService) {}

    @Post('all')
    async getThreadAll(@Req() req: Request) {
      return await this.threadService.getThreadAll();
    }

    @Get('highlights')
    async getHighlights(@Res() res: Response) {
        try { 
            let result = await this.threadService.getHighlights();
            setTimeout(async () => {
                return res.status(500).send({
                    data: []
                });
            }, 3000)
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
        
    }

    // always put at bottom
    @Get(':id')
    async getThreadDetail(@Param('id') id: string) {
        return await this.threadService.getDetail(id);
    }

    @Post('')
    async createThread(@Req() req: Request, @Res() res: Response) {
        try {
            const thread = req.body;
            const username = req.user['username'];
            let transformedThread = {
                ...thread,
                author: username,
                createdAt: new Date(),
                content: JSON.stringify(thread.content)
            }
            await this.threadService.createThread(transformedThread);
            return res.status(200).send({
                message: 'Created thread',
                success: true
            });
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }
}

