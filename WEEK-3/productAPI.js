//create mini - express app(Separate route)
import exp from 'express'
export const productApp = exp.Router()
import { ProductModel } from '../models/ProductModel.js';
//DEFINE PRODUCT REST API Routes
    //Create new product
productApp.post("/products",async(req,res)=>{
    //get new product obj from req
    const newProduct=req.body;
    //Create new product document
    const newProductDocument = new ProductModel(newProduct)
    //save
    await newProductDocument.save()
    //send res
    res.status(201).json({message: "Product Created"});
});

//read all product
productApp.get("/products",async(req,res)=>{
    //read all products from db
    let productsList = await ProductModel.find();
    //send res
    res.status(200).json({message:"products",payload:productsList})
})

//read products by productId
productApp.get("/products/:id",async(req,res)=>{
    //read product id  from req params
    const pid =req.params.id;
    //find products by id
    const productid=await ProductModel.findOne({productId:pid})
    //if product not found
    if(!productid){
        return res.status(404).json({message:"product not found"})
    }
    //send res
    res.status(200).json({message:"product",payload:productid})
})

//update a product by product id
productApp.put("/products/:id",async(req,res)=>{
    //get modified product 
    const modifiedProduct=req.body;
    const pid=req.params.id;
    //find product by id & update
    const updatedProduct=await ProductModel.findOneAndUpdate(
        {peoductId:pid},
        {$set:{...modifiedProduct}},
        {new :true,runValidators:true}
    )
    //send res
    res.status(200).json({message:"Product modified",payload:updatedProduct})
})

//delete product by id
productApp.delete("/products/:id",async(req,res)=>{
    //get pid
    const pid=req.params.id;
    //find and delete product by id
    const deleteProduct=await ProductModel.findOneAndDelete({productId:pid})
    if(!deleteProduct){
        return res.status(404).json({message:"product not found"})
    }
    res.status(200).json({message:"Product Deleted",payload:deleteProduct})
})
