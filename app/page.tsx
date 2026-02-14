
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createAuthClient } from "better-auth/client";
import { headers } from "next/headers";

import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  let session
    try{session = await auth.api.getSession({
      headers : await headers()
    })
    
    
    console.log(session)
  }catch(e){
    console.log(e)
  }

  if(!session){
    return <div>
      you're not loggin
      <Link href={"/login"}>plsease login first </Link>
    </div>
  }
    if(session){
     
      const res = await prisma.user.upsert({
        where :{
          email : session.user.email
        },
        update :{
          name : session.user.name+"nobitakaif"
        },
          create: {
            email : session?.user.email,
            name : session.user.name,
            image : session.user.image
          }
        })
      console.log(res.id)  
    
       
    }
   
  
  return <div>
    {session.user.email}
  </div>
  
}
