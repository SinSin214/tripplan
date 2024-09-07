import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { STATUS } from 'src/utilities/constants';

@Injectable()
export class WrapAsyncInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map(data => {
                    if(!data.status) data.status = STATUS.SUCCESS;
                    return data
                }),
                catchError(err => {
                    const customErr = {
                        messageCode: 'Unknown'
                    };
                    
                    if (err.name === 'PrismaClientKnownRequestError') {
                        // To do something
                    } else {
                        customErr.messageCode = err.message;
                    }

                    return throwError(() => new HttpException(customErr, 500))
                })
            );
  }
}