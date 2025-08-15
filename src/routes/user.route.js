const express = require("express")
const usermodel = require("../models/user.model")
const router = express.Router();
const path = require("path")
router.get("/",(req,res)=>{
    // res.send("HOME HAI YR BAR BAR KYU PARESHAN KR RHA HAI")
    res.render("index",{title:"register karna hai"})
    
  
})

router.get("/about",(req,res)=>{
    res.send("MERE BARE MAI KYA JANEGA TU CHAL BHAG YHA SE")
})
router.get("/home",(req,res)=>{
    res.render("register",{title:"register karna hai"})
})

router.post("/register",async (req,res)=>{
    const{name,email,password} = req.body
    let dupli = await usermodel.findOne({email:email})
    if(dupli && dupli.length!=0){
        return res.json({messegse:"User Already Exsists"})
    }
    await usermodel.create({
        name,
        email,
        password
    })
    res.redirect("register")

})

router.get("/register",(req,res)=>{
    res.render("registered")
})

module.exports = router