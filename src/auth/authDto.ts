import { UserType } from "@prisma/client";

export interface authSignIn {
  userName: string;
  password: string;
}

export interface authSignUp {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  userName: string;
  userType: UserType;
}
