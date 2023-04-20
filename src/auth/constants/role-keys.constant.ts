import { UserRole } from '@prisma/client';

export const AUTH_ROLES = {
  ...UserRole,
  ALL: 'ALL',
};

export const ROLES_KEY = 'roles';
