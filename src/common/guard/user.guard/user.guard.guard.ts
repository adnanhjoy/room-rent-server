/* import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

@Injectable()
export class UserGuardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const headers = request.headers;
    // console.log(headers.authorization);
    // console.log(headers['secret'] === '123456789');
    if (headers['secret'] === '123456789') {
      return true;
    }
    throw new ForbiddenException('Invalid API Key');
  }
} */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

@Injectable()
export class UserGuardGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<Request & { name?: string; email?: string; role?: string }>();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Unauthorized Access: No token provided');
    }

    const decoded = verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    if (!decoded) {
      throw new UnauthorizedException('Unauthorized Access: Invalid token');
    }

    request.name = decoded.name as string;
    request.email = decoded.email as string;
    request.role = decoded.role as string;

    return true;
  }
}
