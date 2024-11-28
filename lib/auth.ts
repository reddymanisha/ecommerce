import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { User } from "@/types"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        if (credentials?.email === "user@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            name: "J Smith",
            email: credentials.email,
            image: null
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as User).id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
}

