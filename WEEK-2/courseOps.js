const courses = ["javascript", "react", "node", "mongodb", "express"];
//filter() courses with name length > 5
let r1 = courses.filter(element => element.length > 5)
console.log(r1)
// map() to convert course names to uppercase
let r2 = courses.map(element=>element.toUpperCase(courses))
console.log(r2)
//reduce() to generate a single string  "JAVASCRIPT | REACT | NODE | MONGODB | EXPRESS"
let r3 = courses.reduce((accumulator,element)=>accumulator+"|"+element)
console.log(r3)
// find() the course "react"
let r4 = courses.find(element=>element==='react')
console.log(r4)
// findIndex() of "node"
let r5 = courses.findIndex(element=>element==='node')
console.log(r5)
