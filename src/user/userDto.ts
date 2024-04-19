import { UserType } from '@prisma/client';

export type userWithoutPassword = {
  email: string;
  firstname: string;
  lastname: string;
  userName: string;
  userType: UserType;
};
