import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { compare } from "bcrypt";

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
      async authorize(credentials, req): Promise<any> {
        const response = await fetch(
          "https://backend-dashboard-opal.vercel.app/findmyuser",
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
          return null
        }
        
        const user = await response.json();
        
        if (!user) {
          return null
          return new Error("Usuário não existe");
        }
        
        const passwordMatch = await compare(
          credentials?.password!,
          user.password
          );
          
          if (!passwordMatch) {

            return null
            return new Error("Credenciais inválidas");
        }

        if (response.ok && user) {
          return user;
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60*60*24*30
  },
  secret: process.env.SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
