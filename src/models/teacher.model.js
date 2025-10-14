const mongoose = require("mongoose")

const teacherSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    id:{
        type: String,
        required: true,
        unique: true
    },
    class:{
        type: String,
        required: true
    },
    salary:{
        type: String,
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    }
})

const teacherModel = mongoose.model("teachers",teacherSchema)
module.exports = teacherModel