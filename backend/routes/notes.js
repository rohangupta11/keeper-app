const express=require("express");
const router=express.Router();
const fetchuser=require("../middleware/fetchUser");
const Note=require("../models/Note");
const { body, validationResult } = require("express-validator");


//ROUTE 1: Get all notes GET "api/notes/fetchallnotes". login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    const notes=await Note.find({user:req.user.id}); //js object
    res.json(notes) //convert to json and sends to client
})

//ROUTE 2: Add a new note using POST "api/notes/addnote". login required
router.post('/addnote',fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({ min: 5 }),
],async (req,res)=>{
    const errors = validationResult(req); // to validate user entered information is correct or not. this "errors" will catch the request body errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //will send the error of validation which occured due to users wrong req body
    }
    const {title,description}=req.body;
    try{
        
        const note=new Note({
            title,
            description,
            user:req.user.id
        })
        const savedNote=await note.save();
        res.json(savedNote);
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
})


//ROUTE 3: Update an existing note using PUT "api/notes/updatenote". login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title,description}=req.body;
    try{
        const newNote={};
        if(title){newNote.title=title}
        if(description){newNote.description=description}

        //find the note to be updated and update it
        let note=await Note.findById(req.params.id); //actual id of note which we want to update
        //if no note with this id exists on db
        if(!note)
        {
            res.status(404).send("Not Found");
        }

        //the user is trying to access someone else's note
        if(note.user.toString()!=req.user.id){  //comparing user id in that note to the user id of the token given to the server
            return res.status(401).send("Not allowed");
        }
        note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 4: Delete a note using DELETE "api/notes/deletenote". login required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    const {title,description}=req.body;
    try{
        //find the note to be deleted
        let note=await Note.findById(req.params.id); //actual id of note which we want to update
        //if no note with this id exists on db
        if(!note)
        {
            res.status(404).send("Not Found");
        }
        //the user is trying to access someone else's note
        if(note.user.toString()!=req.user.id){ 
            return res.status(401).send("Not allowed");
        }
        note=await Note.findByIdAndDelete(req.params.id)
        res.status(200).json(note)
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports=router

