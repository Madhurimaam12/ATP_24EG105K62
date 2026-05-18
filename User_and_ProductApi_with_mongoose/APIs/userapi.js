//create http server
/*import exp from 'express'
//import { use } from 'react';
const app=exp()//internally contains the http server

//use body body parser middleware
app.use(exp.json())*/
//Create mini-express app(Seprate Route)
import exp from 'express'
export const userApp=exp.Router()
//set a port number


//Test data(replace ths test data with database)
    let users=[]

//create User API(REST API)
//REpresentatinal State Transfer
        //Route to handle GET req of Client(http://localhost:8903/users)
        userApp.get('/users',(req,res)=>{
            //send response to client
            //read all users and send response
            res.json({message:"All users",payload:users})
        })
        //Route to read a speific object
        userApp.get('/users/:id',(req,res)=>{
            let idRoll=Number(req.params.id)
            let index=users.find(userObj=>userObj.id==idRoll)
            if(index==undefined)
            {
                return res.json({message:"User not found"})
            }
            res.json({message:"User Found",payload:users})

        })
        //Route to handle POST req of Client
        userApp.post('/users',(req,res)=>{
            //get user from client
            const newUsers=req.body
            //push user into users
            users.push(newUsers)
            //send res
            res.json({message:"User created"})
        })
        //Route to handle PUT request of Client
        userApp.put('/users',(req,res)=>{
            //get modified user fron client{}
            let modifiedUser=req.body;
            //get index of exsisting user in users array
            let index=users.findIndex(userObj=>userObj.id==modifiedUser.id)
            if(index==-1)
            {
                return res.json({message:"User not found"})
            }
            //update user with index
            users.splice(index,1,modifiedUser)
            //send res
            res.json({message:"User Updated"})
        })
        //Route to handle DELETE req of Client
        userApp.delete('/users/:id',(req,res)=>{// /:(arugument)or url parameter
            //get id of user from url parameter
            let idOfUrl=Number(req.params.id) //{id: '1'}
            //find index og user
            let index=users.findIndex(userObj=>userObj.id==idOfUrl)
            //delete user by index
            if(index==-1)
            {
                return res.json({message:"User not found"})
            }
            users.splice(index,1)
            res.json({message:"User deleted Successfully"})
        })