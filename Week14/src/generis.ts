function getFirstElement(arr: (string|number)[]) {
    return arr[0];
}

console.log(getFirstElement(['23','sdf',5]))

function identity<T>(arg: T) : T {
    return arg;
}

console.log(identity<string>("ilovezhengggg"));

function getFirstElementGeneric<T>(arr: T[]) {
    return arr[0];
}

const el = getFirstElementGeneric(["harkiratSingh"]);
console.log(el.toLowerCase())