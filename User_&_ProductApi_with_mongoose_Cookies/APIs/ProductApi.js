import exp from 'express';
import { ProductModel } from '../models/ProductModel.js';
import { hash } from 'bcryptjs';

export const productApp=exp.Router()
productApp.post("/products",async(req,res)=>{
            const newProduct=req.body;
            const newProductDocument=new ProductModel(newProduct);
            //save
            await newProductDocument.save()
            const result=await newProductDocument.save();
            console.log("result : ",result)
            //send response
            res.status(201).json({message:"User Created "});
        });
productApp.get("/products",async(req,res)=>{
    let productList=await ProductModel.find()

    res.status(200).json({message:"Products",payload:productList})
})
//read product by product id
productApp.get("/products/:productId",async(req,res)=>{
        const pid=Number(req.params.productId)
        const productObj=await ProductModel.findOne({productId:pid})
        if(!productObj)
        {
            return res.status(404).json({message:"Product Not Found "})
        }
        res.status(200).json({message:"Product Found ",payload:productObj})
})
//update a product by productId
productApp.put("/products/:productId",async(req,res)=>{
    const modifiedProduct=req.body;
    const pid=Number(req.params.productId)
    const updatedProduct=await ProductModel.findOneAndUpdate({productId:pid},
                                                            {$set:{...modifiedProduct}},
                                                            {new:true,runValidators:true}
                                                            )
    res.status(200).json({message:"Product Updated",payload:updatedProduct})
})
productApp.delete("/products/:productId",async(req,res)=>{
      const pid=Number(req.params.productId)
      const deletedProduct=await ProductModel.findOneAndDelete({productId:pid})
      if(!deletedProduct)
      {
       return res.status(404).json({message:"Product Not Found"})
      }
      res.status(200).json({message:"Product Deleted",payload:deletedProduct})

})
