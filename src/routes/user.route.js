const express = require("express")
const usermodel = require("../models/user.model")
const router = express.Router();
const path = require("path");
const { route } = require("../app");
const studentModel = require("../models/student.model");
router.get("/",(req,res)=>{
    // res.send("HOME HAI YR BAR BAR KYU PARESHAN KR RHA HAI")
    res.render("index",{title:"register karna hai"})
    
  
})

// router.get("/register",(req,res)=>{
//     res.render("register",{title:"register karna hai"})
// })

router.post("/register",async (req,res)=>{
    const{name,email,password,Role} = req.body
    let dupli = await usermodel.findOne({email:email})
    if(dupli && dupli.length!=0){
        return res.json({messegse:"User Already Exsists"})
    }
    await usermodel.create({
        name,
        email,
        password,
        Role
    })
    res.redirect("registered")

})

router.get("/registered",(req,res)=>{
    res.render("registered")
})

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
    if(user.Role==="HEAD"){
      res.redirect("/head")
    }
    if(!student1){
      return res.send("SORRY WE CAN NOT FIND YOUR DATA PLEASE CONTACT TO YOUR HEAD")
    }
    res.render("home",{user,student1})
})


//HEAD PART
router.get("/head",async(req,res)=>{

  const allStudents = await studentModel.find(); // sab students
  res.render("head-/head",{student:allStudents})
})

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


  router.get("/students/search",async (req,res)=>{
   const {classNo,srNo,contactNo,rollNo} = req.query
   const query={}
   if(classNo) {
      query.classNo=classNo
   }
   if(srNo){
    query.srNo=srNo
   }
   if(contactNo){
    query.contactNo=contactNo
   }
   if(rollNo){
    query.rollNo=rollNo
   }

   try {
    const stud = await studentModel.find(query);
    res.render('allStudents', { stud });
} catch(err) {
    res.status(500).send("Student Not Found");
}
});

// router.get("/home",(req,res)=>{
//     res.render("home",{user: req.user})

// })
module.exports = router