const jwt=require("jsonwebtoken");
const BlockuserModel = require("../model/blockuser");
const authenticate=async(req,res,next)=>{
    const token=req.headers.authorization;
    
    console.log(token);
    
    if(token){
        let t=await BlockuserModel.findOne({token});
        // let t=0;
        console.log(t,1);
        if(t){
        res.status(404).send({"msg":"login again"})
                }else {
        var decoded= jwt.verify(token,'backend');
                       console.log(decoded);
                       if(decoded){
                           
                           
                                const userID=decoded.userID;
                                req.body.userID=userID;
                                req.body.role=decoded.role
                                next();
                          }else {
                                res.status(404).send({"msg":"please login first........."})
                               }
                }
    //     var decoded = jwt.verify(token, 'backend');

    //    console.log(decoded);
    //   
       
    //    }else {
    //     res.status(404).send({"msg":"please login first........."})
    //    }
    }else {
        res.status(404).send({"msg":"please login first........."})
    }
    
    }
    module.exports={
        authenticate
    }