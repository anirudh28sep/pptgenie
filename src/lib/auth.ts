import { NextAuthOptions } from "next-auth"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GithubProvider from "next-auth/providers/github"
// import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // Commented out for development
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "dummy",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "dummy",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id || "user1"
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token?.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}