import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    console.log('This is intercepting the request');

    return handler.handle().pipe(
      map((data) => {
        console.log('This is intercepting the response');
        return data;
      }),
    );
  }
}
