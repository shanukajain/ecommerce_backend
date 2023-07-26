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
        let data=await OrderModel.findOne({_id,user_id});
        let all_products=[];
        // console.log(data);
        for(let i=0;i<data.items.length;i++){
            let item=await ProductModel.findOne({_id:data.items[i].product_id})
            all_products.push({item,"quantity":data.items[i].quantity})
        }
        res.status(200).send(all_products);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' })
    }
})

OrderRouter.post("/",async(req,res)=>{
    try {
        let user_id=req.body.user_id;
        let items=await CartModel.find({
      user_id: user_id, 
      items: {
        $not: {
          $elemMatch: {
            user_id: user_id,
          },
        },
      },
});
let totalAmount=0;
for(let i=0;i<items.length;i++){
    let p=await ProductModel.findOne({"_id":items[i].product_id});
    console.log(p,items[i])
    totalAmount+=p.price*items[i].quantity
}
console.log(totalAmount);
let body=new OrderModel({user_id,items,totalAmount});
await body.save();
CartModel.deleteMany({user_id});
res.status(200).send({"msg":"order has been placed"});
}
catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' })
    }
})



module.exports={
    OrderRouter
}