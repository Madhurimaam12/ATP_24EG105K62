//Movie Streaming Platform 
// You are working on a movie recommendation system.
const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
  { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
];
// filter() only "Sci-Fi" movies
let r1 = movies.filter(element=>element.genre==="Sci-Fi")
console.log(r1)
// map() to return: "Inception (8.8)"
let r2 = movies.map(element=>element.rating>=8.8)
console.log(r2)
// reduce() to find average movie rating
let r3 = movies.reduce((accumulator,element)=>accumulator+element.rating,0)/movies.length
console.log(r3)
// find() movie "Joker"
let r4 = movies.find(element=>element.title==="Joker")
console.log(r4)
// findIndex() of "Avengers"
let r5 = movies.findIndex(element=>element.title==="Avengers")
console.log(r5)
