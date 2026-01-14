import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/Github"
import prisma from "./prisma/client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  debug : true,
  providers: [
    Google({
      clientId : process.env.AUTH_GOOGLE_ID,
      clientSecret : process.env.AUTH_GOOGLE_SECRET
    }),
    
  ],
  secret: process.env.AUTH_SECRET,
  callbacks :{
    async signIn({user, account}){
      if(!user.email){
        return false;
      }
      
      const exisitingUser = await prisma.user.findFirst({
        where : {
          email : user.email!
        }
      })
    
      if(!exisitingUser){
        const newUser = await prisma.user.create({
          data:{
            email : user.email!,
            name : user.name!,
            image : user.image!,
            account :{
              // @ts-ignore
              provider          : account?.provider,
              providerAccountId : account?.providerAccountId,
              refresh_token     : account?.refresh_token,
              access_token      : account?.access_token,
              expires_at        : account?.expires_at,
              token_type        : account?.token_type,
              scope             : account?.scope,
              id_token          : account?.id_token,
              session_state     : account?.session_state
            }
          }
        })
        // return newUser ? newUser : "Ops!, Unable to create new User!!"
        return true
      }
      else{ 
        // check account exixt or not if not exist then linked it with user's account
        const isAccount = await prisma.account.findUnique({
          where : {
              provider_providerAccountId :{
                provider : account?.provider!,
                providerAccountId : account?.providerAccountId! 
              }
          }
        })
      
        if(!isAccount){
          const createAccount = await prisma.account.create({
            data :{
              provider          : account?.provider!,
              providerAccountId : account?.providerAccountId!,
              refresh_token     : account?.refresh_token ? account.refresh_token : "not be present",
              access_token      : account?.access_token!,
              expires_at        : account?.expires_at!,
              token_type        : account?.token_type!,
              scope             : account?.scope!,
              id_token          : account?.id_token!,
              // @ts-ignore
              session_state     : account?.session_state ? account?.session_state : "not be present"
            }
          })
          return true
        }
        return true
      }
      
    }
  },
  
})