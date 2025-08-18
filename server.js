const app = require("./src/app")
const connect = require("./src/database/db")

const port = process.env.PORT ||5500
app.listen(port,()=>{
    console.log("SERVER CONNECTED");
    connect();
})