const mongoose = require('mongoose');
const user = require('../Models/schema')
const user_info = async (req, res) => {
    try {
        const data = req.body
        for (let i = 0; i < 2000; i++) {
            const result = await user.insertMany(data);
        }
        res.send("saved")
    }
    catch (err) {
        console.log(err.message)
    }
}
module.exports = { user_info }