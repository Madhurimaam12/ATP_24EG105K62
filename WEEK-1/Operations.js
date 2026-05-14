
const employees = [
    {
        eno : 101,
        name : "Ravi",
        marks : [78,82,91],
    },
    {
        eno : 102,
        name : "Bhanu",
        marks : [65,70,68],
    },
    {
        eno : 103,
        name : "Sneha",
        marks : [88,92,95],
    },
    {
        eno : 104,
        name : "Kiran",
        marks : [95,92,95],
    },
    {
        eno : 105,
        name : "Anitha",
        marks : [90,85,87],
    },
];

// Insert new employee at second Position
employees.splice(1,0,{eno:100,name:"Madhurima",marks:[100,99,98]});
console.log(employees);

// remove an emp with name kiran
employees.splice(4,1);
console.log(employees);

// Change the last mark of sneha from 95 to 75
employees[3].marks[2] = 75; 
console.log(employees);
