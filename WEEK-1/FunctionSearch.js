// write a function that receives an array and search element as args and returns the index of that search element in the array.it should return not found when search element not found
function searchElement(arr, search) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === search) {
      return i;
    }
  }
  return "not found";
}
let marks = [90, 78, 65, 98];
console.log(searchElement(marks, 65));   
console.log(searchElement(marks, 100));  
