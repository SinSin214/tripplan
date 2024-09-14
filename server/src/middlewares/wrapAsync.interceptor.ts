import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ResponseStatus } from 'types/globalTypes';

@Injectable()
export class WrapAsyncInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map(data => {
                    if(!data.status) data.status = ResponseStatus.Success;
                    return data
                }),
                catchError(err => {
                    if (err.name === 'PrismaClientKnownRequestError') {
                        // To do something
                    }
                    console.log(err);

                    return throwError(() => new HttpException(err.message, 500))
                })
            );
  }
}