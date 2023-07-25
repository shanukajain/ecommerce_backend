const mongo=require("mongoose");

const BlockuserSchema=mongo.Schema({
    user_id:String,
    token:String
})
const BlockuserModel=mongo.model("Blockuser",BlockuserSchema);


module.exports=BlockuserModel;