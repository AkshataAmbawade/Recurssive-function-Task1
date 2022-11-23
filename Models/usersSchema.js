const mongoose=require('mongoose');
const users_Schema=mongoose.Schema({
    name:String,
    email:String,
    phoneNo:Number
})

module.exports=mongoose.model("usersDetails",users_Schema)