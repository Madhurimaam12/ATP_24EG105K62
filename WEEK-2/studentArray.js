// Student Performance Dashboard
//You are working on a college result analysis system.
const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];

// filter() students who passed (marks ≥ 40)
let r1 = students.filter(element=>element.marks >= 40)
console.log(r1)
// map() to add a grade field  ≥90 → A, ≥75 → B,≥60 → C,else → D
let r2 = students.map(student=> {
    if (student.  marks >= 90) {
        return  "A Grade"
    }
     else if(student.marks >=75 && student.marks<90)
        return  "B Grade"
    else if(student.marks>=60 && student.marks<75)
      return "C Grade"
    else
      return "D Grade"
})
console.log(r2)
// reduce() to calculate average marks
let r3 = students.reduce((accumulator,student)=>accumulator+student.marks,0)/students.length
console.log(r3)
// find() the student who scored 92
let r4 = students.find(element=>element.marks===92)
console.log(r4)
// findIndex() of student "Kiran"
let r5 = students.findIndex(element=>element.name==="Kiran")
console.log(r5)
