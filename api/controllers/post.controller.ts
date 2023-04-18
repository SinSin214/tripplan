import { NextFunction, Request, Response } from 'express';
import * as postService from '../services/post.service';

export async function getPostDetail(req: Request, res: Response, next: NextFunction) {
    let id = req.body.id;
    let postDetail = await postService.getPostDetail(id);

    return res.status(200).json({
        status: 'OK',
        data: postDetail
    });	;
}
