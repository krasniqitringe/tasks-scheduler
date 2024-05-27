import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (
          data &&
          typeof data === 'object' &&
          data.success !== undefined &&
          data.data !== undefined &&
          data.message !== undefined
        ) {
          return data;
        }
        return {
          success: true,
          message: 'Request processed successfully',
          data,
        };
      }),
    );
  }
}
