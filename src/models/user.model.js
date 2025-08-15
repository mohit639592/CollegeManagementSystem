const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
    },
    email:{
        type: String,
        required: true,
        unique : true
    },
    password:{
        type: String,
        required:true
    }
})

const usermodel = mongoose.model("users",userSchema)

module.exports = usermodel