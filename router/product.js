const express=require("express")
const ProductRouter=express.Router();
ProductRouter.get("/",(req,res)=>{
    res.send("Product");
})







module.exports={ProductRouter}