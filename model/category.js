const mongoose=require("mongoose");
const CategorySchema=mongoose.Schema({
    name:{type:String, required:true},
    discrption:String,
    createdAt: { type: Date, default: Date.now },
})
const CategoryModel= mongoose.model("category",CategorySchema);

module.exports={ CategoryModel}