//iii. app.js - Main application
import { addTask,getAllTasks,completeTask } from "./task.js";

//Test your module system
//1. Add some tasks
addTask("sleep","high",'2026-02-02')
addTask("eat","high",'2026-02-25')
addTask("walk","low",'2026-02-02')
//2. Display all tasks
console.log('tasks:',getAllTasks())
//3. Complete a task

//4. Display all tasks again
console.log(getAllTasks())
