const mongoose=require('mongoose');
const paginationSchema=mongoose.Schema({
    name:String,
    email:String,
    phoneNo:Number
})

module.exports=mongoose.model("userPagination",paginationSchema)