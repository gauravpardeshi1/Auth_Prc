const express=require("express")
const {connection}=require("./db")
const { UserModel } = require("./Models/model")
const jwt=require("jsonwebtoken")
const { AuthMiddleWare } = require("./MiddleWares/Middle")
const { userrouter } = require("./Routes/routes")
const { NoteRouter } = require("./Routes/notes")
const cors=require("cors")

const app=express()

app.use(cors())
app.use(express.json())
app.use("/user",userrouter)

app.use(AuthMiddleWare)
app.use("/notes",NoteRouter)
app.listen(8080,async ()=>{
try{
await connection
console.log("DB CONNECTED TO AUTHPRC")
}catch(err){
console.log(err)
}
console.log("Running at 8080 Port")
})