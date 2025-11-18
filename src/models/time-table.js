const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  classNo: { type: String, required: true },
  day: { type: String, required: true }, // Monday, Tuesday, etc.
  subject: { type: String, required: true },
  teacherId: { type: String },
  teacherName: { type: String },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  roomNo: { type: String }
});

module.exports = mongoose.model("Timetable", timetableSchema);
