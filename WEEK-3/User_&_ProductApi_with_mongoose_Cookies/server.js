import exp from 'express'
import { connect } from 'mongoose'
import { userApp } from './APIs/UserApi.js';
import { productApp } from './APIs/ProductApi.js';
import cookieParser from 'cookie-parser';

const app = exp()   // internally contains the http server
//add body parser
app.use(exp.json())
//add cookie parser middleware
app.use(cookieParser())
//forward req to userapp if path atrats with/user-api
app.use("/user-api",userApp)
app.use("/product-api",productApp)

async function ConnectDB() {
    try {
        await connect("mongodb://localhost:27017/myseconddb");
        console.log("DB connection success")

        const port = 8903;

        // assign port number to HTTP server
        app.listen(port, () => console.log(`Server listening port ${port}...`))

    } catch (err) {
        console.log("err in DB connection:", err)
    }
}

ConnectDB()
//error handlng middleware
app.use((err,req,res,next)=>{
    console.log(err.name)
    if(err.name==='ValidationError')
    {
        return res.status(400).json({message:"error occureed",error:err.message})
    }
    if(err.name==='CastError')
    {
        return res.status(400).json({message:"error occureed",error:err.message})
    }
    res.status(500).json({message:"error occureed",error:"Server side error"})
})
//error =>{name,message,callstack}

//send server side error
