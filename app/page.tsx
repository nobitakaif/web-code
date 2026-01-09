import { signIn } from "@/auth";
import Image from "next/image";

export default function Home() {
  
  return (
   <div className="h-screen w-full items-center justify-center">
      <button onClick={async ()=>{
        "use server"
        await signIn("google", {redirectTo :"/dahboard"})
      }}>sign with Google</button >
   </div>
  );
}
