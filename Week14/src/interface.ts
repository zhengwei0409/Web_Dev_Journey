// Interface
interface People {
    name:string,
    age:number,
    greet(): void
}

let people1: People = {
    name: "zheng",
    age:21,
    greet() {
        console.log("hi" + this.name)   
    }
}

class Manager implements People {
    name: string;
    age: number;
    
    constructor(name:string,age:number) {
        this.name = name;
        this.age = age
    }

    greet(): void {
        console.log('hi' + this.name);
    }
}

people1.greet();

let user = new Manager("wei", 21);
user.greet();

// Type
// Intersection
type Employee = {
    name:string;
    startDate: Date;
}

type ManagerType = {
    name: string;
    department: string;
}

type TeamLead = Employee & ManagerType;

const People3: TeamLead = {
    name: "zheng",
    startDate: new Date(),
    department: "Frontend"
}

console.log(JSON.stringify(People3));

