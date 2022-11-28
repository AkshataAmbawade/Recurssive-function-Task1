const mongoose = require('mongoose');
const user = require('../Models/schema')
const usersDetails = require("../Models/usersSchema");
const paginationUser = require("../Models/pagination");
const userPaginations = require("../Models/userpagination")
const chunk = require("chunk");
const usersSchema = require('../Models/usersSchema');
const user_info = async (req, res) => {
    try {
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
        chunkData = chunk(data, 1000)
        let chunkDataLength = chunkData.length
        console.log(chunkDataLength)
        async function insertData(chunkData, i) {
            if (chunkDataLength != i) {

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
                res.send("send")
            }


        }
        insertData(chunkData, 0)
    } catch (err) { console.log(err); }
}
async function getData() {
    const data = await user.find()
    if (data.length != 0) {
        return { status: true, data: data };

    } else {
        return { status: false, data: null }
    }
}

const info = async (req, res) => {
    try {
        async function paginationData() {
            const pagination = await getData()

            if (pagination.status == true) {
                const newArr = pagination.data.map(userInfo)
                const result = await paginationUser.bulkWrite(newArr)
                res.status(200).json(result)
            } else {

                res.status(500).json(err)
            }
        }
        paginationData()
    } catch (err) {
        console.log(err.message)
    }
}

async function fetchData(page, limit) {
    // console.log(page)
    const data = await user.find().skip((page - 1) * limit).limit(limit);
    // console.log(page)
    if (data.length !== 0) {
        return { status: true, data: data };

    } else {
        return { status: false, data: null }
    }
}
const uInfo = (user) => {
    const details = {
        name: user.name,
        email: user.email,
        phoneNo: user.phoneNo
    }
    return { insertOne: { document: details } }
}
const pageLimit = async (req, res) => {
    try {
        async function func(page_, limit_) {
            let page = page_ 
            let limit =limit_
            const pagination = await fetchData(page,limit)
            if (pagination.status == true) {
                const newArr = pagination.data.map(uInfo)
                const result = await userPaginations.bulkWrite(newArr)
                // res.status(200).json("Saved")
                func(++page, limit)
            } else {
                res.status(200).json("Saved")
            }
        }
        func(1, 10)
    } catch (err) {
        res.status(500).json(err)
    }
}




module.exports = { user_info, user_details, info, pageLimit }