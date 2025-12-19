import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"

export const { handlers, signIn, auth, signOut} = NextAuth({
    callbacks:{
    },
    secret : process.env.AUTH_SECRET,
    adapter : PrismaAdapter(db),
    session:{strategy : "jwt"},
    ...authConfig,
})