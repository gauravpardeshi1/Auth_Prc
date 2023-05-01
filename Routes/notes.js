const express=require("express")
const { NotesModel } = require("../Models/notes.model")
const NoteRouter=express.Router()

NoteRouter.post("/created",async(req,res)=>{
    try {
        const Note= new NotesModel(req.body)
        await Note.save()
        res.send({"msg":"Note Created"})
    } catch (error) {
        res.status(400).send({"err":err.message})
    }
})

NoteRouter.get("/",async(req,res)=>{
    try {
        const Note=await NotesModel.find({authorID:req.body.authorID})
         res.send(Note)
    } catch (error) {
        res.status(400).send({"err":err.message})
    }
})

NoteRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID}= req.params 
    const note=await NotesModel.findOne({_id:noteID})
    try {
        if(req.body.authorID!=note.authorID){
res.status(400).send({"msg":"You are not Authorized to this Action"})
        }else{
            await NotesModel.findByIdAndUpdate({_id:noteID},req.body)
            res.status(200).send({"msg":`The Note with id ${noteID} has been updated`})
        }
       
    } catch (error) {
        res.status(400).send({"err":"ERROR"})
    }
})

NoteRouter.delete("/delete/:noteID",async(req,res)=>{
    const {noteID}= req.params
    const note=await NotesModel.findOne({_id:noteID}) 
    try {
        if(req.body.authorID!=note.authorID){
res.status(400).send({"msg":"You are not Authorized to this Action"})
        }else{
            await NotesModel.findByIdAndDelete({_id:noteID})
            res.status(200).send({"msg":`The Note with id ${noteID} has been deleted`})
        }
      
    } catch (error) {
        res.status(400).send({"err":"ERROR"})
    }
})

module.exports={NoteRouter}