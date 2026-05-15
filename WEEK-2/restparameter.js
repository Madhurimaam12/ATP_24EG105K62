
// 1st Question
let fruits = ["apple", "banana"];
//1.Create a new array moreFruits
let copyobj = [...fruits,"orange"]
console.log(fruits)
console.log(copyobj)

// 2nd Question
let user = { 
    name: "Ravi",
     city: "Hyderabad"
 }
let UpdatedUser = {...user,age:25};
console.log(user)
console.log(UpdatedUser)    

// 3rd question 
// write a function thar receives any no of args and returns their sum using REST parameter
const findSum = (...numbers)=> {
    return numbers.reduce((accumulator,element)=>accumulator+element)
    
}
result=findSum(10,20,30,40)
console.log(result)
