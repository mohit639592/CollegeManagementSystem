// const http = require("http");

// const server = http.createServer((req,res)=>{
//     if(req.url === "/"){
//         res.end("HOME")
//     }
//     if(req.url === "/about"){
//         res.end("ABOUT")
//     }
// })

// server.listen(3000,()=>{
//     console.log("SUCCESS")
// })

const server = require('express')

const app = server();
app.get("/",(req,res)=>{
    res.send("home hai bhai")
})
app.get("/login",(req,res)=>{
    res.end("LOGIN KAREGA KYA YRR")
})

app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("SERVER STARTED");
    }
})