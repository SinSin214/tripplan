import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRECT_ACCESS_TOKEN);
        req.user = decoded;
        next();
   } catch (error) {
        res.status(401).send({
            message: `Authorization: ${error.message}`
        });
   }
  }
}
