// function Statement aka function declaration
// function a() {
//     console.log("a called")
// }

// // Function Expression 
// var b = function() {
//     console.log("b is called")
// }

// // Anonymous Function
// function () {

// }

// // Named Function Expression
// var b = function xyz() {
//     console.log("b is called")
//     console.log(xyz)
// }

// u cannot access xyz in global scope (xyz is not attach to global scope), 
// only inside function itself

// Different between Parameters & Arguments

// First Class Function / First Class Citizens
// Ans: The ability of using function as value, it can be passed as a argument,
//      can be taken as return and can be store in a variable

// Higher Order Function
// Ans: Functions that takes one or more functions as argument, and return function itself

// Callback function
// Ans: Functions that can be passed as an argument to another function

// Array.prototype.customFunction()

// Convert number to binary
// const arr = [5,1,3,2,6];

// console.log(arr.map((value) => {
//     return value.toString(2);
// }))

// reduce()
// const arr = [5,1,3,2,6];

// const output = arr.reduce(function(acc, curr) {
//     acc += curr;
//     return acc
// })

// console.log(output)

// const abc = {
//     a:20,
//     x: function() {
//         const y = () => {
//             console.log(this)
//         }
//         y();
//     }
// }
// abc.x()

// testing scope
// let x = 0;
// {
//     let x = 5;
//     console.log(x);
// }

// console.log(x)

// polyfill for bind()
// function printName(age, arg2) {
//     console.log(this.name + " hiii" + " age: " + age + " " + arg2)
//     console.log(this)
// }

// const user = {
//     name: 'zhengg',
//     age: 21
// }

// const printNamereturned = printName.bind(user, 24);
// printNamereturned("arg2")

// Function.prototype.myBind = function(context, ...arg) {
//     const originalFunc = this;
//     return function(...arg2) {
//         originalFunc.apply(context,[...arg, ...arg2])
//     }
// }

// const printNamereturned2 = printName.myBind(user, 24);
// printNamereturned2("arg2")

// Currying 
// function f1(arg1) {
//     return function(arg2) {
//         console.log(arg1 + " " + arg2);
//     }
// }

// f1('hello')('zhengg');




