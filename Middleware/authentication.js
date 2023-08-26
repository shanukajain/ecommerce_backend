const jwt=require("jsonwebtoken");
const BlockuserModel = require("../model/blockuser");
const authenticate=async(req,res,next)=>{
    const token=req.headers.authorization;
    try {
        
   
    console.log(token);
    
    if(token){
        let t=await BlockuserModel.findOne({token});
        console.log(t,1);
        if(t){
        res.status(404).send({"msg":"login again"})
                }else {
        var decoded= jwt.verify(token,'backend');
                       if(decoded){
                                const userID=decoded.user_id;
                                req.body.user_id=userID;
                                req.body.name=decoded.name;
                                next();
                          }else {
                                res.status(404).send({"msg":"please login first........."})
                               }
                }
    }else {
        res.status(404).send({"msg":"please login first........."})
    } } catch (error) {
        res.status(404).send({"msg":"please login first........."})
    }
    
    }
    module.exports={
        authenticate
    }