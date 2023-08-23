//* NESTJS
import { SetMetadata } from '@nestjs/common';

//* LIBRARY
import { UserType } from '@prisma/client';

export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles);
