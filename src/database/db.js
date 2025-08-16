const mongoose = require("mongoose")
const connect = ()=>{
    mongoose.connect("mongodb+srv://mohit:SPKFKYIszcLQ5I7d@cluster0.safgwzo.mongodb.net/")
    .then(()=>{
        console.log("DB CONNECTED");

    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connect;