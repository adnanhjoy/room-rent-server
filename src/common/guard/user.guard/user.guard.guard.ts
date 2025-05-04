import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

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
}
