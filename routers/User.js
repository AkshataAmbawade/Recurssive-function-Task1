const express=require('express');
const router=express.Router();
const { user_info, user_details, info, pageLimit } = require('../Controllers/user');


router.route("/user").get(user_info)
router.route("/userDetails").get(user_details)
router.route("/info").get(info);
router.route("/pageLimit").get(pageLimit)

module.exports=router