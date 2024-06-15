import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { CustomRequest, UserType } from 'types';
import * as utils from '../utilities/authentication';

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  async use(@Req() req: CustomRequest, @Res() res: Response, next: NextFunction) {
    try {
        const session = req.cookies.get('session');
        if(!session) throw new Error('RequireLogin');
        
        const decryptedData = utils.decryptToken(session, process.env.SECRECT_SESSION_TOKEN);
        req.user = decryptedData as UserType;
        next();
   } catch (error) {
        return res.status(500).send({
            messageCode: error.name
        });
   }
  }
}