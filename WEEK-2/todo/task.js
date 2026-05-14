import { validateTitle,validatePriority,validateDueDate } from "./validator.js";

//ii. task.js - Task operations
//TODO: Import validator functions
         
let tasks = [];
//1. Add new task
function addTask(title, priority, dueDate) {
//Validate using imported functions
if(!validateDueDate||!validatePriority||!validateTitle){
    return "invalid"
}
//If valid, add to tasks array
tasks.push({title,priority,dueDate})
//Return success/error message
return "task success"
}

// 2. Get all tasks
function getAllTasks() {
// Return all tasks
return tasks
}
                    
//3. Mark task as complete
function completeTask(taskId) {
//Find task and mark as complete
return true
}

//Export functions
export {completeTask,getAllTasks,addTask}
