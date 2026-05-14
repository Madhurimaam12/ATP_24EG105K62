// i. validator.js - Input validation
//TODO: Export these validation functions

// 1. Validate task title (not empty, min 3 chars)
function validateTitle(title) {
    //  Your code here
    if(!title)
        return "title is empty"
    if(title.length<3)
        return "invalid title"
    return true
    }
                      
// 2. Validate priority (must be: low, medium, high)
    function validatePriority(priority) {
        // Your code here
        const priorities=['low','medium','high']
        if(priority.isLowercase==priorities.includes)
            return true
        return "invalid priority"
    }
                      
// 3. Validate due date (must be future date)
    function validateDueDate(date) {
        // Your code here
        const inDate=new date(date)
        const today=new date()
        if(inDate<=today)
        return 'invalid duedate';
    return true
    }

export {validateTitle,validatePriority,validateDueDate}
