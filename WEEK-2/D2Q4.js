/*
1.Exam portal simulator:
-----------------------------
When a student submits an exam:

        Immediately show: “Exam submitted successfully”
        After 2 seconds → show: “Evaluating answers…”
        After 4 seconds → show: “Result: Pass”
*/

console.log("Exam Submitted Successfully");
setTimeout(()=> {
    console.log("Evaluating answers")
},2000);
setTimeout(()=> {
    console.log("Result: Pass")
},4000);
