const OrderModel = require("../model/order");
const shippmentModel = require("../model/shippment");

const ShippmentRouter=require("express")();

ShippmentRouter.post("/:id",async(req,res)=>{
try {
    let order_id=req.params.id;
    let body= new shippmentModel({order_id});
    await OrderModel.findByIdAndUpdate({_id:order_id},{status:"in shippment"});
    await body.save();
    res.status(200).send({message:"shippment start", tracking_num:body._id});
} catch (error) {
    res.status(500).send({message:"error"})
}
})

ShippmentRouter.patch("/:id",async(req,res)=>{
    try {
        let body=req.body;
        let id=req.params.id;
        await shippmentModel.findByIdAndUpdate({_id:id},body);
        let data=await shippmentModel.find({_id:id});
        await OrderModel.findByIdAndUpdate({_id:data.order_id},body);
        res.status(200).send({message:"shippment update"});
    } catch (error) {
        res.status(500);
    }
})

ShippmentRouter.get("/:id",async(req,res)=>{
        try {
            let id=req.params.id;
            let data=await shippmentModel.find({_id:id})
            res.send(data);
        } catch (error) {
            res.status(500);
        }
})






module.exports={ShippmentRouter}