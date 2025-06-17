import { PrismaClient } from '../src/generated/prisma/client'

const client = new PrismaClient();

async function  createUser() {
    const user = await client.user.create({
        data: {
            username: "zehngg",
            password: "32534",
            age: 21,
            city: "Kuala Lumpur"
        }
    })

}

async function  findUser() {
    const user = await client.user.findFirst({
        where: {
            id: 2
        },
        include: {
            todos: true
        }
    })

    console.log(user?.todos[0].description)

}

findUser();