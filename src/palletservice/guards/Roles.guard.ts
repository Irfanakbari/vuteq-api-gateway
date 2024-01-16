import { CanActivate, ExecutionContext, Inject, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { timeout } from 'rxjs/operators';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '../../guards/interfaces/user.interface';

export class RolesGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly client: ClientProxy,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      return false;
    }

    try {
      // imaging allowed roles are admin and moderator, roles parameter comes from controller
      const roles = this.reflector.get<string[]>('roles', context.getHandler());

      if (!roles || !roles.length) {
        return true;
      }

      const user: User = await this.client
        .send({ role: 'auth', cmd: 'check' }, { jwt: token })
        .pipe(timeout(5000))
        .toPromise();

      if (!user || !user.roles || !Array.isArray(user.roles)) {
        // Jika data pengguna tidak valid, akses ditolak
        return false;
      }

      const userRoles = user.roles.find(
        (role) => role.app === 'PALLET_CONTROL',
      );

      const hasRequiredRole = roles.some((requiredRole) =>
        user.roles.some((userRole) => userRole.role === requiredRole),
      );

      return (
        userRoles.role.includes('SUPER') || // imagin we have allow this totally (any means user access anything)
        hasRequiredRole
      );
    } catch (err) {
      Logger.error(err);

      return false;
    }
  }
}
