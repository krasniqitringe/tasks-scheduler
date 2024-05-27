import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class PaginationInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const query = request.query;

    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;

    return next.handle().pipe(
      map((data) => {
        const total = data.total;
        const result = data.result;

        return {
          data: result,
          total,
          page,
          limit,
        };
      })
    );
  }
}
