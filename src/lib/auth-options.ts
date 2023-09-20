import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import {UserCurrent} from '@/types/user-current'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req): Promise<UserCurrent> {
        const response = await fetch(
          "https://backend-dashboard-opal.vercel.app/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );
        
        if (!response.ok) {
          throw new Error("User not found")
        }
        const user = await response.json();

        if (!user) {
          throw new Error("User not found")
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) {
        return true
      }
      return false
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString()
      return baseUrl
    },

    async session({ session, token }) {
      if (token) {
        session = {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            name: token.name,
            balance: token.balance,
            token: token.token,
            email: token.email,
            userAccess: token.userAccess as Array<{ Access: { name: string } }>
          }
        }
      }
      return session
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.token = user.token
        token.balance = user.balance
        token.userAccess = user.userAccess
      }
      
      return token
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  secret: process.env.NEXTAUTH_SECRET,
};