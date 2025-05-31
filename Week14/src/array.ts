function getMax(nums: number[]) {
    let max = -100000;
    for(let i of nums) {
        if(i > max) max = i;
    }
    return max;
}

console.log(getMax([2,4,6,7,23,1,2]));


interface Users {
    firstName: string;
    lastName: string;
    age: number;
}

function filterUsers(users: Users[]) {
    return users.map((user) => user.age>18);
}

