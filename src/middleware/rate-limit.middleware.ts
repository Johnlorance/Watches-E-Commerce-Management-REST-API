import {injectable, Provider} from '@loopback/core';
import {Middleware, MiddlewareContext} from '@loopback/rest';
import {NextFunction, Request, Response} from 'express';

const rateLimitStore: Record<string, {count: number; lastRequest: number}> = {};
const RATE_LIMIT = 5; // Max requests
const TIME_WINDOW = 15 * 60 * 1000; // 15 minutes

@injectable()
export class CustomRateLimitMiddlewareProvider implements Provider<Middleware> {
  value(): Middleware {
    return async (ctx: MiddlewareContext, next: NextFunction) => {
      const req = ctx.request as Request;
      const res = ctx.response as Response;

      const ip = req.ip || 'unknown_ip';
      console.log(`Request IP: ${ip}`);

      if (!rateLimitStore[ip]) {
        rateLimitStore[ip] = {count: 1, lastRequest: Date.now()};
        console.log(`Initial request from ${ip}`);
      } else {
        const now = Date.now();
        const timeDiff = now - rateLimitStore[ip].lastRequest;

        if (timeDiff > TIME_WINDOW) {
          rateLimitStore[ip] = {count: 1, lastRequest: now};
          console.log(`Rate limit window reset for ${ip}`);
        } else {
          rateLimitStore[ip].count += 1;
          console.log(`Request count updated for ${ip}: ${rateLimitStore[ip].count}`);
        }
      }

      if (rateLimitStore[ip].count > RATE_LIMIT) {
        console.log(`Rate limit exceeded for ${ip}`);
        res.status(429).send('Too many requests, please try again later.');
        return;
      }

      await next();


    };

  }
  
}
