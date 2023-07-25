const express=require("express");
const OrderModel = require("../model/order");
const { ProductModel } = require("../model/product");
const CartModel = require("../model/cart");
const OrderRouter=express.Router();

OrderRouter.get("/",async(req,res)=>{
    let user_id=req.body.user_id;
    let data=await OrderModel.find({user_id});
    res.send(data);
})
OrderRouter.get("/:_id",async(req,res)=>{
    try {
        let _id=req.params._id;
        let user_id=req.body.user_id;
        let data=await OrderModel.find({_id,user_id});
        let all_products=[];
        for(let i=0;i<data.items.length;i++){
            all_products.push(await ProductModel.find({_id:data.items[i].product_id}),data.items[i].quantity)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' })
    }
})

OrderRouter.post("/",async(req,res)=>{
    try {
        let user_id=req.body.user_id;
        let data=await CartModel.find({
      userId: userId, // The provided user ID
      items: {
        $not: {
          $elemMatch: {
            userId: userId, // Check if any cart item has the given user ID
          },
        },
      },
});
}
catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' })
    }
})



module.exports={
    OrderRouter
}