const express=require('express');
const router=express.Router();
const { user_info } = require('../Controllers/user');


router.route("/user").get(user_info)

module.exports=router