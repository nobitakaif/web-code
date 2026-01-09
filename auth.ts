import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/Github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
        authorization : {
            params : {
                prompt : "consent",
                access_type : "offline",
                resposne_type : "code"
            }
        }
    })
  ],
})