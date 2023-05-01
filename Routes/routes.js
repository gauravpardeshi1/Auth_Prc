const express=require("express")
const bcrypt=require("bcrypt")
const { UserModel } = require("../Models/model")
const jwt=require("jsonwebtoken")
const { AuthMiddleWare } = require("../MiddleWares/Middle")
const userrouter=express.Router()
//userrouter.use(express.json())
userrouter.post("/register",async (req,res)=>{
    const {email,pass,name,age}=req.body
try{
    bcrypt.hash(pass,5,async(err,hash)=>{
        const user= new UserModel({email,name,age,pass:hash})
        await user.save()
        res.status(200).send({"msg":"Registered"})
    })

}catch(err){
console.log(err)
}

})
userrouter.post("/login",async (req,res)=>{
const {email,pass}=req.body
try{
const user=await UserModel.findOne({email})

if(user){
    bcrypt.compare(pass,user.pass,(err,result)=>{
if(result){
    const token=jwt.sign({author:user.name,authorID:user._id},"masai")
    res.send({"msg":"Login Successfull","token":token})
}else{
    res.send("Wrong Credentials !!")
}
    })
   
} else {
res.send("Login Failed")
}
} catch(err){
console.log(err)
}
})

module.exports={userrouter}