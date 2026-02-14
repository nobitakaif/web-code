import { prisma } from "./db";

async function main(){
    const res = await prisma.user.create({
        data : {
            email : "nobitakaif111111@gmail.com",
            name : "nobitakaif",
            image : "http://localhost:8000",
        }
    })
    return res.id
}

console.log(await main())