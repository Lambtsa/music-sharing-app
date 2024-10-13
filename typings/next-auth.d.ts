import { JWT } from "next-auth/jwt"
import NextAuth, { type Profile, type User } from 'next-auth';
import { AuthenticationErrorType } from "@/types/auth";

declare module 'next-auth' {
  interface User {
    sub: string
    email: string
    email_verified: boolean
    family_name: string
    given_name: string
    name: string
    picture: string
    iat: number
    iss: string
    jti: string
    exp: number
  }
  interface Session {
    user: User;
    token: DefaultSession["token"];
    error?: AuthenticationErrorType;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends User {
    provider?: string;
    accessToken?: string;
    expiresAt?: number;
    refreshToken?: string;
    iat: number;
    exp: number;
    jti: string;
    error?: AuthenticationErrorType;
  }
}
