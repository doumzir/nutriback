import { UserType } from '@prisma/client';

export type UserWithoutPassword = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  userName: string;
  userType: UserType;
};
