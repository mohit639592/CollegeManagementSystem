const mongoose = require("mongoose")
const connect = ()=>{
    mongoose.connect("mongodb+srv://mohit:9aBCcL1jZBJupPOM@cluster0.safgwzo.mongodb.net/")
    .then(()=>{
        console.log("DB CONNECTED");

    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connect;