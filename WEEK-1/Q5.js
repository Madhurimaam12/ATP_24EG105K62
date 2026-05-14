// write a function that receives 3 number args and return the big number
function findBig(a, b, c) {
  return (a > b)  ? (a > c ? a : c) : (b > c ? b : c);
}
console.log(findBig(10, 25, 15));
