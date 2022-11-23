const express=require('express');
const router=express.Router();
const { user_info, user_details } = require('../Controllers/user');


router.route("/user").get(user_info)
router.route("/userDetails").get(user_details)

module.exports=router