import NextAuth from "next-auth";
import { AuthUser } from "./authUser";

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}