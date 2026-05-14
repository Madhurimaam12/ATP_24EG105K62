import { createContext,useState } from "react"

// create context provider object
export const counterContextObj=createContext()

function ContextProvider({children}) {
    //state
  const [counter,setCounter] = useState(0)
  
   // function to change state
  const changeCounter=()=>{
    setCounter(counter+1)
  };
  return (<counterContextObj.Provider value={{counter,changeCounter}}>
    {children}
  </counterContextObj.Provider>
  )
}
export default ContextProvider
