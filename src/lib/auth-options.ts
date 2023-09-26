import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserCurrent } from "@/types/user-current";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req): Promise<UserCurrent> {
        const response = await fetch(
          "https://backend-dashboard-gold.vercel.app/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
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
            userAccess: token.userAccess as Array<{ Access: { name: string } }>,
          },
        };
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.token = user.token;
        token.balance = user.balance;
        token.userAccess = user.userAccess;
      }
      return token;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
