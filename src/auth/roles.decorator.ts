import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

const ROLES_KEY = 'roles';
type Keys = keyof typeof UserRole;
type RoleValues = (typeof UserRole)[Keys];
export const Roles = (...args: RoleValues[]) => SetMetadata(ROLES_KEY, args);
