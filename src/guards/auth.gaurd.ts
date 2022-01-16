import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { session } = context.switchToHttp().getRequest();
    return session.userId;
  }
}
