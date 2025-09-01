const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  srNo: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  classNo: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  fatherName: {
    type: String,
    required: true
  },
  motherName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  dateofBirth: {
    type: String,
    required: true
  },
  adharcardNo: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  emergencyNo: {
    type: String,
    required: true
  },
  admissionDate: {
    type: String,
    required: true
  },
  academicYear: {
    type: String
  },
  gender: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Student", studentSchema);
