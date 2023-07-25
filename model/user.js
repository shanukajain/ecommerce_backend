const mongo=require("mongoose");

const UserSchema=mongo.Schema({
name:String,
email:String,
gender:String,
password:String,
})
const UserModel=mongo.model("user",UserSchema);


module.exports=UserModel;