import { NextFunction, Request, Response } from 'express';
import * as postService from '../services/post.service';

export async function getDetail(req: Request, res: Response, next: NextFunction) {
    let id = req.body.id;
    let result = await postService.getDetail(id);

    return res.status(200).json(result[0]);
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
    let result = await postService.getAll();

    return res.status(200).json(result);	;
}
