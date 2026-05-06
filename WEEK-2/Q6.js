//Employee Payroll Processor
//You are building a salary processing module in a company HR app.
const employees = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
];

//filter() employees from IT department
let r1 = employees.filter(element=>element.department=="IT")
console.log(r1)
// map() to add: netSalary = salary + 10% bonus
let r2 = employees.map(element=> {
    return {name: element.name,netsalary: element.salary + (0.1*element.salary)
 }
})
console.log(r2)
//  reduce() to calculate total salary payout
let r3 = employees.reduce((accumulator,element)=>accumulator+element.salary,0)
console.log(r3)
//  find() employee with salary 30000
let r4 = employees.find(element=>element.salary===30000)
console.log(r4)
// findIndex() of employee "Neha"
let r5 = employees.findIndex(element=>element.name==="Neha")
console.log(r5)
