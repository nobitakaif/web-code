"use client"

import { authClient} from "@/lib/auth-client"
import { prisma } from "@/lib/db"


export default function Auth(){
    const { data: session, isPending} = authClient.useSession()

    if(isPending){
        return <div className="flex justify-center items-center h-screen">
            <p>Loading</p>
        </div>
    }

    console.log(session)
    if(!session){
        return <div>
            you're not logged-in
            <button onClick={()=>{
                authClient.signIn.social({provider : "google"})
            }}>
                login
            </button>
        </div>

    }
    
    return <div>
        <button>
            welcome {session.user.email}
        </button>
    </div>
}