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


res.status(200).send({message:"order has been placed"});
}
catch (error) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
})

OrderRouter.patch("/:_id",async(req,res)=>{
try {
    let _id=req.params._id;
    await ProductModel.findByIdAndUpdate({ _id }, body);
} catch (error) {
    res.status(500).send({ message: 'Internal Server Error' })
}
})
OrderRouter.get("/shippment_lable/:id",async(req,res)=>{
    try {
        let _id=req.params.id;
        let name=req.body.name;
        let payload={"status":"In Shippment"}
        await OrderModel.findByIdAndUpdate({ _id }, payload);
        let body=await OrderModel.findOne({_id});
        if(body.tracking_num){
        let data=await genratepdf({name,address:body["address"],id:_id,totalamount:body["totalAmount"],trackingNumber:body.tracking_num});
        res.status(200).send(data);
        }else {
            res.status(200).send({message:"tracking number not genreted yet"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal Server Error' })
    }
})
OrderRouter.get('/download-label/:id', async (req, res) => {
    let id=req.params.id;
    const pdfPath = path.join(__dirname, '..','shippmentlablepdf', `${id}.pdf`);
    try {
      const pdfBytes = await fs.readFile(pdfPath);
      res.setHeader('Content-Disposition', 'attachment; filename="shipping_label.pdf"');
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfBytes);
    } catch (error) {
      res.status(404).send('Shipping label not found.');
    }
  });

  OrderRouter.get("/status/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let status=await OrderModel.findOne({_id:id});
         res.status(200).send({status:status.status});   
    } catch (error) {
        
    }
  })


module.exports={
    OrderRouter
}