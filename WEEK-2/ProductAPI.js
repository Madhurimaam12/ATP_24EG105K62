import exp from 'express'
export const productApp=exp.Router()
            let product=[]
        productApp.get('/product',(req,res)=>{
            //send response to client
            //read all users and send response
            res.json({message:"All products ",payload:product})
        })
    productApp.get('/product/:Brand', (req, res) => {
    let brandProduct = req.params.Brand;
    let productsByBrand = product.filter(productObj => productObj.Brand == brandProduct);
    if (productsByBrand.length == 0) {
        return res.json({ message: "Product not found" });
    }
    res.json({ message: "Product Found", payload: productsByBrand });
});

        productApp.post('/product',(req,res)=>{
            const newProduct=req.body
            product.push(newProduct)
            res.json({message:"Product created"})
        })
        productApp.put('/product',(req,res)=>{
            let modifiedProduct=req.body;
            let index=product.findIndex(productObj=>productObj.productId==modifiedProduct.productId)
            if(index==-1)
            {
                return res.json({message:"Product not found"})
            }
            product.splice(index,1,modifiedProduct)
            res.json({message:"Product Updated"})
        })
        productApp.delete('/product/:productId',(req,res)=>{
            let idOfUrl=Number(req.params.productId) 
            let index=product.findIndex(productObj=>productObj.productId==idOfUrl)
            if(index==-1)
            {
                return res.json({message:"Product not found"})
            }
            product.splice(index,1)
            res.json({message:"Product deleted Successfully"})
        })
