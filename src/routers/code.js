const express = require("express")
const router = new express.Router()
const Code = require("../models/code")
const auth = require("../middleware/auth")

router.post("/code/save",auth ,async (req,res) => {
    const code = new Code({
        ...req.body,
        owner: req.user._id
    })
    
    try{
        // console.log(code);
        await code.save()
        res.status(201).send(code)
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch("/updatecode/:id",auth , async(req,res) => {
    const updates = Object.keys(req.body); 
    const allowedUpdate = ['title', 'question', 'answer','tags'];
    const isValid = updates.every((update) =>  allowedUpdate.includes(update) )
    if(!isValid){
        return res.status(400).send("Invalid request")
    }

    try{
        console.log("update");
        const code = await Code.findOne({_id: req.params.id, owner: req.user._id});
        if(!code){
            res.status(404).send()
        }

        updates.forEach((update) => code[update] = req.body[update])
        await code.save()
        res.send(code)
    }catch(e){
        console.log("error");
        res.status(500).send()
    }
})

router.get("/allcode",auth ,async(req,res) => {
    try{
        // const code = await Code.find({owner: req.user._id});
        await req.user.populate('codes').execPopulate()
        // if(!code){
        //     res.status(404).send()
        // }
        res.send(req.user.codes)
    }catch(e){
        res.status(500).send()
    }
})

router.delete("/code/:id",auth ,async(req,res) => {
    try{
        // console.log("delete request")
        const code = await Code.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!code){
            return res.status(404).send()
        }
        res.send(code)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router