import NextAuth from "next-auth";
import { UserCurrent } from "./user-current";

declare module "next-auth" {
  interface Session {
    user: UserCurrent;
  }
  interface User extends UserCurrent {
    name: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserCurrent {
    name: string;
    email: string;
  }
}
