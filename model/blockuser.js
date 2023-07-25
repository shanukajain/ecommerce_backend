const mongo=require("mongoose");

const BlockuserSchema=mongo.Schema({
    token:String
})
const BlockuserModel=mongo.model("Blockuser",BlockuserSchema);


module.exports=BlockuserModel;