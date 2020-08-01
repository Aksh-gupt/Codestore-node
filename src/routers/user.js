const express = require("express")
const router = new express.Router()
const User = require("../models/user")
const auth = require("../middleware/auth")
const { sendWelcomeEmail, resetPassword } = require('../emails/account')
// CREATE USER
router.post("/users",async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        const token = await user.generateAuthToken();
        sendWelcomeEmail(user.email,user.name)
        res.status(201).send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
    
})

router.get("/user/getname",auth ,async (req,res) => {
    try{
        // console.log(req.user.name);
        res.status(200).send({name:req.user.name});
    }catch(e){
        res.status(400).send(e);
    }
})

router.post("/user/login", async(req, res) => {
    // console.log("run");
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.send({user, token});
    }catch(e){
        res.status(400).send()
    }
})

router.post('/user/logout', auth, async(req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

// countDocuments({})
router.get("/alluser",async (req,res) => {
    try{
        const user = await User.find({});
        res.status(200).send(user)
    } catch(e){
        res.status(500).send()
    }
})

// check
router.get("/profile/:username", async (req,res) => {
    const username = req.params.username;

    try{
        const user = await User.findOne({username});
        await user.populate('accounts').execPopulate()
        // if(!user){
        //     return res.status(404).send();
        // }
        res.status(200).send(user.accounts)
    }catch(e){
        res.status(500).send(e)
    }

})

// check
router.delete("/user/delete", auth, async(req,res) => {
    try{
        await req.user.remove()
        res.send(req.user) 
    }catch(e){
        res.status(500).send()
    }
}) 

router.post("/resetrequest", async(req,res) => {
    const email = req.body.email
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).send({error:"This email address don't exist in our database"})
        }
        const resetId = await user.generateResetId();
        // console.log("this is running")
        resetPassword(user.email,user.name,resetId);
        res.status(200).send({text: "check your email"});
    }catch(e){
        res.status(500).send(e)
    }
})

router.post("/resetpass/:id",async(req,res) => {
    try{
        const user = await User.findOne({resetId: req.params.id})

        if(!user){
            return res.status(404).send({text: "This is invalid url"})
        }

        user.password = req.body.password
        user.resetId = '';
        await user.save();
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router