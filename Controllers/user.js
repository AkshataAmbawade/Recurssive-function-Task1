const mongoose = require('mongoose');
const user = require('../Models/schema')
const usersDetails = require("../Models/usersSchema")
const chunk = require("chunk");
const { mapReduce } = require('../Models/schema');
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
        async function insertData(chunkData, i) {
            if (chunkDataLength != i) {
                // console.log(i)
                // const result=usersDetails.insertMany(chunkData[i]);
                // res.send("ok")
                // const result=await usersDetails.bulkWrite([{insertOne:{"document":{chunkData}}}])

                const myFunc = (user) => {
                    const details = {
                        name: user.name,
                        email: user.email,
                        phoneNo: user.phoneNo
                    }
                    return { insertOne: { document: details } }
                }
                const arr = chunkData[i]
                const newArr = arr.map(myFunc)
                const result = await usersDetails.bulkWrite(newArr)
                insertData(chunkData, ++i)
            } else {
                // console.log(chunkData);
                res.send("send")
            }
            // const arr=chunkData;
            // const newArr=arr.map(myFunction);

            // console.log(newArr)
            // function myFunction(chunkData){
            //     return chunkData
            // }
            // const result=await usersDetails.bulkWrite([{insertOne:{"document":{newArr}}}])

        }
        insertData(chunkData, 0)
    } catch (err) { console.log(err); }
}



module.exports = { user_info, user_details }