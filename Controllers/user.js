const mongoose = require('mongoose');
const user = require('../Models/schema')
const usersDetails = require("../Models/usersSchema")
const chunk = require("chunk")
const user_info = async (req, res) => {
    try {
        // const data = req.body
        for (let i = 0; i < 2000; i++) {
            const result = await user.bulkWrite([
                {
                    insertOne: {
                        "document": {
                            "name": "Akshata",
                            "email": "askahta@gmail.com",
                            "phoneNo": 1234567890
                        }
                    }
                }, {
                    insertOne: {
                        "document": {
                            "name": "Vedant",
                            "email": "vedant@gmail.com",
                            "phoneNo": 1234567890
                        }
                    }
                },
                {
                    insertOne: {
                        "document": {
                            "name": "Smitali",
                            "email": "smitali@gmail.com",
                            "phoneNo": 1234567890
                        }
                    }
                },
                {
                    insertOne: {
                        "document": {
                            "name": "Swarupa",
                            "email": "swarupa@gmail.com",
                            "phoneNo": 1234567890
                        }
                    }
                },
                {
                    insertOne: {
                        "document": {
                            "name": "Mamta",
                            "email": "mamta@gmail.com",
                            "phoneNo": 1234567890
                        }
                    }
                }
            ]);
        }
        res.send("saved")
    }
    catch (err) {
        console.log(err.message)
    }
}

const user_details = async (req, res) => {
    try {
        let data = await user.find()
        //    console.log(data)
        chunkData = chunk(data, 1000)
        let chunkDataLength = chunkData.length
        console.log(chunkDataLength)
        //    console.log(chunkData)
        function insertData(chunkData,i){
            if(chunkDataLength != i){
                // const result=usersDetails.insertMany(chunkData[i]);
                const result=usersDetails.bulkWrite([{insertOne:{"document":{name:chunkData[i]}}}])
                insertData(chunkData,++i)
            }else{
                console.log(chunkData);
              res.send("send")
            }
        }
        insertData(chunkData,0)
    } catch (err) { console.log(err); }
}



module.exports = { user_info, user_details }