const express=require("express");
const { ProductModel } = require("../model/product");
const ProductRouter=express.Router();


ProductRouter.get("/",async(req,res)=>{
    try {
        let category_id=req.query.category_id||null;
        let product_id=req.query.product_id||null;
        if(category_id){
            if(category_id.length==12){
            let data=await ProductModel.find({category_id});
            
            if(data.length!=0){
                res.status(200).send(data);
            }else{
                res.status(200).send({"msg":"no such category there"})
            }
        }else {
            res.status(402).send({"msg":"wrong category id"})

        }

        }else if(product_id){
            if(product_id.length==12){
            let data=await ProductModel.find({"_id":product_id});
            if(data.length!=0){
                res.status(200).send(data);
            }else{
                res.status(200).send({"msg":"no such product there"})
            }
        }
            else {
                res.status(402).send({"msg":"wrong product id"})
    
            }
        }else {
        let data=await ProductModel.find();
        console.log(3)

        res.status(200).send(data);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal Server Error' })
    }
})

ProductRouter.post("/create",async(req,res)=>{
    try {
        let body=req.body
        if(body.title && body.price && body.category_id){
            let body=new ProductModel(body);
            await body.save();
        }else {
            res.status(422).send({"msg":"enter all details"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' })

    }
})


ProductRouter.patch("/:_id",async(req,res)=>{
    try {
        let _id=re.params._id;
        let body=req.body;
       await ProductModel.findByIdAndUpdate({_id},body);
        res.status(200).send("done");
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' })
    }
})

ProductRouter.delete("/:_id",async(req,res)=>{
    try {
        let _id=re.params._id;
       await ProductModel.findByIdAndDelete({_id});
        res.status(200).send("done");
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' })
    }
})










module.exports={ProductRouter}