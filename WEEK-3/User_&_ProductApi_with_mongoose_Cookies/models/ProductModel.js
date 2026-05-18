import { Schema,model} from "mongoose";
const productSchema=new Schema({
    productId:{
        type:Number,
        required:[true,"Product Id can't be empty"],
        unique:[true,"Product ID already exits"],
    },
    productName:{
        type:String,
        required:[true,"Product Name can't be empty"]
    },
    price:{
        type:Number,
        required:[true,"Price can't be empty"],
        min:[10000,"Minimum price is at least 10000"],
        max:[50000,"Maxmimum Price is about 50000"]
    },
    Brand:{
        type:String,
        required:[true,"Brand can't be empty"]
    }
})

export const ProductModel=model("product",productSchema)
