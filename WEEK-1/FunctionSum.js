// write a function that receives an array as an arg and return their sum
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
return sum;
}
let marks = [90, 78, 65, 98];
console.log(sumArray(marks));
