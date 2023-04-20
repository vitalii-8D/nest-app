import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

import { AUTH_ROLES, ROLES_KEY } from '../constants/role-keys.constant';
import { AllowedRolesType } from '../decorators/role.decorator';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride<AllowedRolesType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!roles || !roles.length) {
      return true;
    }

    let isAuthenticate;
    try {
      isAuthenticate = await super.canActivate(context);
    } catch (err) {
      return false;
    }

    if (!isAuthenticate) {
      return false;
    }

    const { role = '' } = context.switchToHttp().getRequest()
      ?.user as UserEntity;

    if (roles.includes(AUTH_ROLES.ALL) || roles.includes(role)) {
      return true;
    }

    return false;
    // return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log(JSON.stringify(user, null, 2));

    if (err || !user) {
      throw err || info;
    }
    return user;
  }
}
