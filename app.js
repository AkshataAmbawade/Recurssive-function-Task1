
const express=require('express');
const app=express();
app.use(express.json())//middleware
const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/User")
.then(()=>{
    console.log("working")
})
.catch((err)=>{
    console.log(err)
})
const user_info=require("./routers/User")
app.use("/api/v1/user",user_info)

app.listen(2000,()=>{
    console.log("Listen to the port number 2000")
})