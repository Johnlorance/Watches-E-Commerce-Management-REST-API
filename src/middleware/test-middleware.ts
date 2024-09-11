import {injectable, Provider} from '@loopback/core';
import {Middleware, MiddlewareContext} from '@loopback/rest';

@injectable()
export class TestMiddlewareProvider implements Provider<Middleware> {
  value(): Middleware {
    return async (ctx: MiddlewareContext, next) => {
      console.log('Test middleware invoked for path:', ctx.request.path);
      await next();
    };
  }
}
