import { Schema,model } from "mongoose";
//Create Product Schema
const produtSchema = new Schema({
    //structure of User resource
    productId:{
        type:Number,
        required:[true,"product id required"]
    },
    productName:{
        type:String,
        required:[true,"ProductName is required"],
    },
    price:{
        type:Number,
        required:[true,"Password Required"],
        min:[10000,"price should atleast be 10000"],
        max:[50000,"price should not exceed 50000"]
    },
    brand:{
        type:String,
        required:[true,"email Required"]
    }
},{
    versionKey:false,
    timestamps:true,
})

//Generate ProductModel ==>  creates object based on that schema 
export const ProductModel = model("product",produtSchema)
