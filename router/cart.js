const express=require("express");
const CartModel = require("../model/cart");
const CartRoute=express.Router();

CartRoute.get("/",async(req,res)=>{
    try {
        let user_id=req.body.user_id;
        let data=await CartModel.find({user_id});
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' })
    }
})
CartRoute.post("/:_id",async(req,res)=>{
    try {
        let product_id=req.params._id;
        let user_id=req.body.user_id;
        let data=await CartModel.findOne({product_id,user_id});
        if(!data){
        let body=await CartModel({product_id,user_id});
        await body.save();
        res.status(200).send({"msg":"product added to the cart"});
        }else {
            res.status(200).send({"msg":"product already there"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' })
    }
})


CartRoute.patch("/:_id",async(req,res)=>{
try {
    let payload=req.body.quantity;
    let _id=req.params._id;
    await CartModel.findByIdAndUpdate({_id},{"quantity":payload});
    res.status(200).send("done");
} catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' })
}
})


CartRoute.delete("/:_id",async(req,res)=>{
    try {
        let _id=req.params._id;
        await CartModel.findByIdAndDelete({_id});
        res.status(200).send("done");
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' })
    }
    })
    

module.exports={CartRoute}