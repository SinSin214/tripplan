import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { CustomRequest, UserType } from 'types';

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRECT_ACCESS_TOKEN);
        req.user = decoded as UserType;
        next();
   } catch (error) {
        return res.status(500).send({
            messageCode: error.name === 'TokenExpiredError' ? `AccessTokenExpired` : error.name
        });
   }
  }
}
