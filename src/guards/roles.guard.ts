import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {
  }

  canActivate(context: ExecutionContext): boolean {
    // 合并类权限和方法权限
    const roles = this.reflector.getAllAndMerge<string[]>('roles', [
      context.getClass(),
      context.getHandler()
    ]);
    if (!roles || roles.length < 1) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    const user = this.authService.parse(token);
    const role = user?.meta?.roles;

    // 目前用户角色只限制为一个，因此简单通过includes判断
    return roles.includes(role);
  }
}
