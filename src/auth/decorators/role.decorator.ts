import { SetMetadata } from '@nestjs/common';

import { AUTH_ROLES, ROLES_KEY } from '../constants/role-keys.constant';

type RoleKeys = keyof typeof AUTH_ROLES;
export type AllowedRolesType = (typeof AUTH_ROLES)[RoleKeys];

// export type AllowedRoles =
export const Roles = (...roles: AllowedRolesType[]) =>
  SetMetadata(ROLES_KEY, roles);
