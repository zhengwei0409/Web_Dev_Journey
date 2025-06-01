interface User3 {
    id: string,
    name: string,
    age: number,
    email: string,
    password: string;
}

type UpdateProps = Pick<User3, 'name'| 'age' | 'email'>

type UpdatePropsOptional = Partial<UpdateProps>

function UpdateUser(props: UpdateProps) {
    // hit the database to update the user
}

// readonly
type User4 = {
    readonly name: string;
    readonly age: number;
}



const userExample: User4 = {
    name: "zhneg",
    age: 21
} 

// userExample.age = 23;

// or
type User5 = {
     name: string;
     age: number;
}

const userExample2: Readonly<User5> = {
    name: "zhneg",
    age: 21
} 


// Record

type UserAge = {
    [key:string] : number;
}

const usersAge : UserAge = {
    "ras@qd1" : 423
}

// console.log(usersAge.ras@qd1)
console.log(usersAge["ras@qd1"]); // ✅ Works
// Use dot notation for simple keys (like usersAge.name) and 
// bracket notation for any key that has special characters, spaces, or starts with a number.


// or 

type UsersAge2 = Record<string,number>

const usersAge2 : UserAge = {
    "ras@qd1" : 423
}


// In JavaScript (and TypeScript, since it compiles to JS), 
// object keys are always strings (or symbols), even if you write a number.

// new Map<string,number>()
// .set(,)
// .get()
// .delete()

// exclude
type EventType = 'click' | 'scroll' | 'mousemove'
type ExcludeEvent = Exclude<EventType, 'scroll'>

const handleEvent = (event: ExcludeEvent) => {
    console.log('Handling event: ' + event);
}

handleEvent('click');
// handleEvent('scroll')
