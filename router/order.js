const express=require("express");
const OrderModel = require("../model/order");
const path = require('path');
const fs = require('fs').promises;
const { ProductModel } = require("../model/product");
const CartModel = require("../model/cart");
const { genratepdf } = require("../pdfcreater");
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
// order fullfillment 
// shipping label
// amount total
// tracking no.(awb)
// 


OrderRouter.post("/",async(req,res)=>{
    try {
        let user_id=req.body.user_id;
        let address=req.body.address;
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
    totalAmount+=p.price*items[i].quantity
}
let body=new OrderModel({user_id,items,totalAmount,address});
await body.save();
    const result=await CartModel.deleteMany({user_id});


res.status(200).send({"msg":"order has been placed"});
}
catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' })
    }
})

OrderRouter.patch("/:_id",async(req,res)=>{
try {
        
    await ProductModel.findByIdAndUpdate({ _id }, body);
} catch (error) {
    res.status(500).send({ message: 'Internal Server Error' })
}
})
OrderRouter.get("/shippment_lable/:id",async(req,res)=>{
    try {
        let _id=req.params.id;
        let name=req.body.name
        let payload={"status":"In Shippment"}
        await OrderModel.findByIdAndUpdate({ _id }, payload);
        let body=await OrderModel.findOne({_id})
        let data=await genratepdf({name,address:body["address"],id:_id,totalamount:body["totalAmount"]});
        res.status(200).send(data);
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal Server Error' })
    }
})
OrderRouter.get('/download-label/:id', async (req, res) => {
    let id=req.params.id;
    const pdfPath = path.join(__dirname, '..','shippmentlablepdf', `${id}.pdf`);
    try {
        console.log(pdfPath);
      const pdfBytes = await fs.readFile(pdfPath);
      res.setHeader('Content-Disposition', 'attachment; filename="shipping_label.pdf"');
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfBytes);
    } catch (error) {
      res.status(404).send('Shipping label not found.');
    }
  });

module.exports={
    OrderRouter
}