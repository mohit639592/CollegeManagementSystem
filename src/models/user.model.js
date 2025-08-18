const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique : true
    },
    password:{
        type: String,
        required:true
    },
    Role:{
        type: String,
        // required: true
    }

})

const usermodel = mongoose.model("users",userSchema)

module.exports = usermodel