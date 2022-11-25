const mongoose=require('mongoose');
const schemaUser=mongoose.Schema({
    name:String,
    email:String,
    phoneNo:Number
})

module.exports=mongoose.model("pageLimit",schemaUser)