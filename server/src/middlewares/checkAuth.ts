import { Injectable, NestMiddleware, Req, Res, UseInterceptors } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { throwCustomError } from 'src/utilities/helpers';
import { CustomRequest, UserType } from 'types';
import { ResponseStatus } from 'types/globalTypes';
import * as utils from '../utilities/authentication';
import { WrapAsyncInterceptor } from 'src/middlewares/wrapAsync.interceptor';

@UseInterceptors(new WrapAsyncInterceptor())
@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  async use(@Req() req: CustomRequest, @Res() res: Response, next: NextFunction) {
    try {
      // Check if request is allowed
      // Check 2 things, isLogedIn and permission
      const session = req.cookies.session;
      if (!session) {
        throwCustomError({
          messageCode: 'RequireLogin',
          status: ResponseStatus.Fail
        });
      }
      // const isAllowed =  checkPermission(session);
      const decryptedData = utils.decryptToken(session, process.env.SECRECT_SESSION_TOKEN);
      req.user = decryptedData as UserType;
      next();
    } catch (err) {
      return res.status(500).send({
        messageCode: err.name
      })
    }
  }
}