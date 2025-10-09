const express = require("express")
const usermodel = require("../models/user.model")
const router = express.Router();
const path = require("path");
// const { route } = require("../app");
const studentModel = require("../models/student.model");
const teacherModel = require("../models/teacher.model")
const Subject = require("../models/subject.model")
router.get("/",(req,res)=>{
    // res.send("HOME HAI YR BAR BAR KYU PARESHAN KR RHA HAI")
    res.render("index",{title:"register karna hai"})
    
  
})
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already registered");
    }

    // Create new user
    await usermodel.create({
      name,
      email,
      password,
      role
    });

    res.status(201).send("Signup successful!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error during signup");
  }
});


router.get("/login",(req,res)=>{
    res.render("login",{title:"login hai"})
})


router.post("/login",async (req,res)=>{
    const {email,password} = req.body

    const user =await usermodel.findOne({email:email})
    const student1 =await studentModel.findOne({email:email})

    if(!user){
        return res.send("USER NOT FOUND PLEASE REGISTER FIRST")
    }

    if(user.password != password){
        return res.send("WRONG PASSWORD")
    }
    if(user.role==="HEAD"){
      res.redirect("/head")
    }
    if(!student1){
      return res.send("SORRY WE CAN NOT FIND YOUR DATA PLEASE CONTACT TO YOUR HEAD")
    }
    const subjects = await Subject.find({ class: student1.classNo });
    res.render("home",{user,student1,subjects})
})


router.get("/head/add-subject",(req,res)=>{
  res.render("head-/add-subject");
})



router.post("/add-subject", async (req, res) => {
  try {
      const { class: className, subjects } = req.body;

      if (!className || !subjects || subjects.length === 0) {
          return res.status(400).send("Class and subjects are required");
      }

      // Each subject now has name and teacherId
      const subjectsToSave = subjects.map(sub => ({
          name: sub.name,
          class: className,
          teacherId: sub.teacherId
      }));

      // Insert all subjects at once
      await Subject.insertMany(subjectsToSave);

      res.send("Subjects added successfully!");
  } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
  }
});





//HEAD PART
router.get("/head",async(req,res)=>{

  const allStudents = await studentModel.find(); // sab students ka data pass 
  res.render("head-/head",{student:allStudents})
})


//HEAD STUDENT PART
router.get("/head/students",async (req,res)=>{
    const allstudent = await studentModel.find();
    res.render("head-/student-data",{students:allstudent})
})

router.get("/head/add-student",(req,res)=>{
  res.render("head-/add-student")
})

router.post("/head/add-student",async(req,res)=>{
  const {srNo,name,email,password,classNo,rollNo,fatherName,motherName,address,dateofBirth,adharcardNo,contactNo,emergencyNo,admissionDate,academicYear,gender} = req.body
    console.log(req.body);
    const student = await studentModel.findOne({
      $or: [
        { email: email },
        { srNo: srNo },
        { rollNo: rollNo }
      ]
    });
    
    if (student) {
      return res.send("USER ALREADY EXISTS");
    }
    
    
    await studentModel.create({
      srNo,
      name,
      email,
      password,
      classNo,
      rollNo,
      fatherName,
      motherName,
      address,
      dateofBirth,
      adharcardNo,
      contactNo,
      emergencyNo,
      admissionDate,
      academicYear,
      gender
    })
    await usermodel.create({
      name,
      email,
      password,
      
  })
    res.send("STUDENT ADDED SUCCESSFULLY")
  })










//HEAD TEACHER PART
router.get("/head/add-teacher",(req,res)=>{
    res.render("head-/add-teacher")
})
// router.get("/home",(req,res)=>{
//     res.render("home",{user: req.user})

// })
module.exports = router