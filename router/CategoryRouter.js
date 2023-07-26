const express=require("express");
const { CategoryModel } = require("../model/category");
const CategoryRouter=express.Router();



CategoryRouter.get("/",async(req,res)=>{
    try {
        let data=await CategoryModel.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' })
    }
})

CategoryRouter.post("/create",async(req,res)=>{
    try {
        let {name,discrption}=req.body
        if(name){
            let body=new CategoryModel({name,discrption});
            await body.save();
            res.status(200).send({"msg":"category created"})
        }else {
            res.status(422).send({"msg":"enter all details"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' })

    }
})


CategoryRouter.patch("/:_id",async(req,res)=>{
    try {
        let _id=re.params._id;
        let body=req.body;
        CategoryModel.findByIdAndUpdate({_id},body);
        res.status(200).send("done");
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' })
    }
})

CategoryRouter.delete("/:_id",async(req,res)=>{
    try {
        let _id=re.params._id;
        CategoryModel.findByIdAndDelete({_id});
        res.status(200).send("done");
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' })
    }
})




module.exports={CategoryRouter}