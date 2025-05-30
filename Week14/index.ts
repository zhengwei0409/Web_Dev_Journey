
interface User {
    name: string,
    age: number
}

function greet(user: User) {
    console.log(user.name + " " + user.age);
}

greet({
    name: "zhneg",
    age: 34
})

console.log(true);