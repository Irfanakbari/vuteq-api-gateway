import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';

@Injectable()
export class AuthSuperGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      return false;
    }

    try {
      const result = await this.client
        .send({ role: 'auth', cmd: 'check' }, { jwt: token })
        .pipe(timeout(5000))
        .toPromise();
      if (!result) {
        return false;
      }
      if (!result.isSuper) {
        return false;
      }
      request.user = result;
      return true;
    } catch (error) {
      return false;
    }
  }
}
