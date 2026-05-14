import { create } from 'zustand'

// create store
export const useCounterStore = create((set)=>({
    //state
    newCounter:0,
    newCounter1:100,
    // add user state (name,age,email)
    user:{name:"madhu",email:"madhu@gmail.com",age:19},
    // function to change email
    changeEmail:()=>set((state)=>({user:{...state.user,email:"madhurima@gmail.com"}})),
    // function to change name and age
     changeNameAge:()=>set((state)=>({user:{...state.user,name:"Madhurima",age:20}})),

    // functions to modify the state
    incrementCounter:()=>set(state=>({newCounter:state.newCounter+1})),
     incrementCounter1:()=>set(state=>({newCounter1:state.newCounter1+1})),
    decrementCounter:()=>set(state=>({newCounter:state.newCounter-1})),
    reset:()=>set({newCounter:0}),
    //functiion to change newCounter to 500
    changeCounter:()=>set({newCounter:500}),
    // functon to decrement newCounter1 by 20
    decrementCounter1:()=>set(state=>({newCounter1:state.newCounter1-20}))
}))