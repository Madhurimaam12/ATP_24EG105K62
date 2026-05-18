const temperatures = [32, 35, 28, 40, 38, 30, 42];
// filter temperatues above 35
let r1 = temperatures.filter((element)=> element>35)
console.log(r1)
// map() to convert temperatures from celcius to fahreinheit
let r2 = temperatures.map(element=>element*(1.8)+32)
console.log(r2)
//reduce() to calculate average temperature
let r3 = temperatures.reduce((accumulator,element)=>accumulator+element)
console.log(r3)
let average = r3/temperatures.length
console.log(average)
// find() first temperature above 40
let r4 = temperatures.find(element=>element>40)
console.log(r4)
//findIndex() of temperature 28
let r5 = temperatures.findIndex(element=>element===28)
console.log(r5)
