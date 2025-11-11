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


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find users in all collections
    const user = await usermodel.findOne({ email });
    const student = await studentModel.findOne({ email });
    const teacher = await teacherModel.findOne({ email });

    // 1️⃣ If teacher exists
    if (teacher) {
      if (teacher.password !== password) {
        return res.send("WRONG PASSWORD");
      }
      return res.redirect(`/teacher?email=${teacher.email}`);

    }

    // 2️⃣ If no user found
    if (!user) {
      return res.send("USER NOT FOUND — PLEASE REGISTER FIRST");
    }

    // 3️⃣ Verify password
    if (user.password !== password) {
      return res.send("WRONG PASSWORD");
    }

    // 4️⃣ If head user
    if (user.role === "HEAD") {
      return res.redirect("/head");
    }

    // 5️⃣ If student data missing
    if (!student) {
      return res.send("SORRY, WE CANNOT FIND YOUR DATA. PLEASE CONTACT YOUR HEAD.");
    }

    // 6️⃣ Fetch subjects and render home page
    const subjects = await Subject.find({ class: student.classNo });
    return res.render("home", {email, user, student1:student, subjects });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});



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

  const allStudents = await studentModel.find(); 
  const teacher = await teacherModel.find();
  res.render("head-/head",{student:allStudents , teacher})
})


//HEAD STUDENT PART
router.get("/head/students",async (req,res)=>{
    const allstudent = await studentModel.find();
    res.render("head-/student-data",{students:allstudent})
})

router.get("/head/add-student",(req,res)=>{
  res.render("head-/add-student")
})



//update std
router.get("/update-student", (req, res) => {
  res.render("updateStudent", { student: null, message: null });
});

// 🟡 Find student by email (form submission)
router.post("/find-student", async (req, res) => {
  try {
    const { email } = req.body;
    const student = await studentModel.findOne({ email });

    if (!student) {
      return res.render("updateStudent", { student: null, message: "Student not found" });
    }

    res.render("updateStudent", { student, message: "Student found!" });
  } catch (error) {
    console.error(error);
    res.render("updateStudent", { student: null, message: "Error finding student" });
  }
});

// 🟣 Update student data
router.post("/update-student", async (req, res) => {
  try {
    const { email, ...updateData } = req.body;

    const updatedStudent = await studentModel.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.render("updateStudent", { student: null, message: "Student not found" });
    }

    res.render("updateStudent", { student: updatedStudent, message: "Student updated successfully!" });
  } catch (error) {
    console.error("Error updating student:", error);
    res.render("updateStudent", { student: null, message: "Error updating student" });
  }
});


//update teacher
router.get("/update-teacher", (req, res) => {
  res.render("updateTeacher", { teacher: null, message: null });
});

// 🟡 Find teacher by email
router.post("/find-teacher", async (req, res) => {
  try {
    const { email } = req.body;
    const teacher = await teacherModel.findOne({ email });

    if (!teacher) {
      return res.render("updateTeacher", { teacher: null, message: "Teacher not found" });
    }

    res.render("updateTeacher", { teacher, message: "Teacher found!" });
  } catch (error) {
    console.error("Error finding teacher:", error);
    res.render("updateTeacher", { teacher: null, message: "Error finding teacher" });
  }
});

// 🟣 Update teacher data
router.post("/update-teacher", async (req, res) => {
  try {
    const { email, ...updateData } = req.body;

    const updatedTeacher = await teacherModel.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      return res.render("updateTeacher", { teacher: null, message: "Teacher not found" });
    }

    res.render("updateTeacher", { teacher: updatedTeacher, message: "Teacher updated successfully!" });
  } catch (error) {
    console.error("Error updating teacher:", error);
    res.render("updateTeacher", { teacher: null, message: "Error updating teacher" });
  }
});




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





  router.get("/sitemap.xml", (req, res) => {
    res.sendFile(path.join(__dirname, "../../sitemap.xml"));
  });
  
  
  router.get("/profile", async (req, res) => {
    try {
      const email = req.query.email;
      if (!email) return res.status(400).send("Email missing in query");
  
      const student = await studentModel.findOne({ email });
      if (!student) return res.status(404).send("Student not found");
  
      res.render("studentprofile", { student });
    } catch (err) {
      console.error("Profile error:", err);
      res.status(500).send("Error loading profile");
    }
  });
  
    




//HEAD TEACHER PART
router.get("/head/add-teacher",async(req,res)=>{
  const teachers = await teacherModel.find(); // get all teachers
  res.render("head-/add-teacher", { teachers });
})

router.get("/teacher", async (req, res) => {
  // Get teacher email (from session or query)
  const email = req.query.email; // or req.session.teacherEmail
  if (!email) return res.redirect("/login");

  const teacher = await teacherModel.findOne({ email });
  const student = await studentModel.find();
  if (!teacher) return res.send("Teacher not found!");

  // Wrap in array for EJS table
  res.render("teacher",{teacher,student});
});


router.post("/head/add-teacher",async (req,res)=>{
  const { name, email, password, id, class: className, salary, contactNo, address,subject } = req.body;
  const newTeacher = new teacherModel({
    name,
    email,
    password,
    id,
    class: className,
    salary,
    contactNo,
    address,
    subject
  });

  await newTeacher.save();
  res.redirect("/head/add-teacher");
})
// router.get("/home",(req,res)=>{
//     res.render("home",{user: req.user})

// })
module.exports = router