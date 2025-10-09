const mongoose = require("mongoose")
const connect = ()=>{
    mongoose.connect("mongodb+srv://mohit786:Radhaji369@cluster0.hhq831m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("DB CONNECTED");

    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connect;