import { Schema,model} from "mongoose";
//Create User Schema (username,password,email,age)
const userSchema=new Schema({
    //Structure of User resourse
    username:{
        type:String,
        required:[true,"UserName is Required"],
        minLength:[4,"Min legth of username is 4 characters"],
        maxLength:[9,"User name size exceeds 9 chars"]
    },
    password:{
        type:String,
        required:[true,"Password should be Typed"],
    },
    email:{
        type:String,
        required:[true,"Email requried"],
        unique:[true,"Email already existed"]
    },
    age:{
        type:Number
    }
},{
    versionKey:false,
    timestamps:true
});
//Generate UserModel
export const UserModel=model("user",userSchema)