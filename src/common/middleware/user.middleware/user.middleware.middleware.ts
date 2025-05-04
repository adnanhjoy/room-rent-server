import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UserMiddlewareMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    console.log('Headers', headers);
    /* if (headers['secret'] === '121318') {
      console.log('Secret key is correct');
      next();
    } else {
      res.status(403).send({
        status: 403,
        data: null,
        message: 'Secret key is incorrect',
      });
    } */
    next()
  }
}
