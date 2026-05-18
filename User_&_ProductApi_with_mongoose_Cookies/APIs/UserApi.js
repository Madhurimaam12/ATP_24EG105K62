//create min-express app(Seperate route)
import exp from 'express'
import { UserModel } from '../models/UserModel.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import {hash,compare} from 'bcryptjs';
import jwt from 'jsonwebtoken'
const {sign}=jwt
export const userApp=exp.Router()
//DEFINE USER REST API Routes
        // create new user

// user login
userApp.post('/auth',async(req,res)=>{
    //get user cred obj from client
    const {email,password}=req.body
    //verify email
    let user=await UserModel.findOne({email:email})
    //if email not existed
    if(!user)
    {
        return res.status(404).json({message:"Invalied Email"})
    }
    //compare password
    let result = await compare(password,user.password)
    //if password not matched
    if(!result)
    {
        return res.status(400).json({message:"Invaild Password"})
    }
    //if passwords not matched
        //create token (jsonwebtoken -jwt --jaat)
        const signedToken= sign({email:user.email},"abcdef",{expiresIn:10})
        //store token as httpOnly cookie
        res.cookie("token",signedToken,{httpOnly:true,sameSite:"lax",secure:false})//important
        //send token in res
        res.status(200).json({message:"login success",payload:user})

})

        userApp.post("/users",async(req,res)=>{
            //get new user odj from req
            const  newUser=req.body;
            //hash the password
            const hashedPassword =await hash(newUser.password,10)
            //replace plain password with hased password
            newUser.password=hashedPassword;
            //Create new user document
            const newUserDocument=new UserModel(newUser);

            //save
            await newUserDocument.save()
            const result=await newUserDocument.save();
            console.log("result : ",result)
            //send response
            res.status(201).json({message:"User Created "});
        });
        //read all users
        userApp.get("/users",verifyToken,async(req,res)=>{
            //read all users from db
            let usersList= await UserModel.find()
            //send res
            res.status(200).json({message:"users",payload:usersList})
        })
        //read a user by object id
        userApp.get("/users/:id",async(req,res)=>{
            //read object id from re params
            const uid=req.params.id
            //find user by id
            const userObj=await UserModel.findById(uid)
            //if user not found
            if(!userObj)
            {
               return res.status(404).json({message:"User Not found"}) 
            }
            //send res
            res.status(200).json({message:"user",payload:userObj})
        })
        userApp.put("/users/:id",verifyToken,async(req,res)=>{
            //get modified user from req
            const modifiedUser=req.body;
            const hashedPassword =await hash(modifiedUser.password,10)
            //replace plain password with hased password
            modifiedUser.password=hashedPassword;
            const uid=req.params.id;
            //find user byid
            const updatedUser=await UserModel.findByIdAndUpdate(uid,
                                                                {$set:{...modifiedUser}},
                                                                {new:true,runValidators:true}
                                                                )
            //update user
             res.status(200).json({message:"user updated",payload:updatedUser})
            //send res
        })
        userApp.delete("/users/:id",async(req,res)=>{
            const uid=req.params.id
            //find user and delete
            const deletedUser=await UserModel.findByIdAndDelete(uid);
            if(!deletedUser)
            {
                return res.status(404).json({message:"User Not Found"})
            }
            res.status(200).json({message:"Deleted User",payload:deletedUser})
        })