import prisma  from "./client"

async function main (){
    const response = await prisma.user.create({
        data:{
            email : "eamil@gmail.com",
            username : "username",
            password : "password"
        }
    })
    return response.id
}

main().then(r =>{
    console.log(r)
})
