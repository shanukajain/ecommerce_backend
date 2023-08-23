const mongoose=require("mongoose");
const ProductSchema=mongoose.Schema({
    title:{type:String, required:true},
    price:{type:Number, required:true},
    discreption:{type:String},
    Images:{type:Array},
    availability:{type:Boolean,default:true},
    category_id:{type:mongoose.Schema.Types.ObjectId, ref:"Categories",required:true},
    approved:{type:Boolean,default:false}
})
const ProductModel= mongoose.model("Product",ProductSchema);

module.exports={ ProductModel}