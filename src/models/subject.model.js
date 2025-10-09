const mongoose = require("mongoose");

// Subject Schema
const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: false
    },
    class: {
        type: String,
        required: true
    },
    teacherId: {
        type: String, // or mongoose.Schema.Types.ObjectId if linking to teacher collection
        required: true
    }
});

const subjectModel = mongoose.model("subjects", subjectSchema);
module.exports = subjectModel;
