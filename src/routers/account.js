const express = require("express")
const router = new express.Router()
const Account = require("../models/account")
const User = require("../models/user")
const auth = require("../middleware/auth") 

router.post("/account",auth , async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ["codechef", "codeforces", "hackerrank", "hackerearth", "spoj", "leetcode", "hackerblock"];
    const isValid = updates.every((update) => allowedUpdate.includes(update) );
    if(!isValid){
        res.status(400).send("Invalid inputs")
    }
    const account = new Account({
        ...req.body,
        owner: req.user._id
    })
    // console.log(account);
    try{
        const find = await Account.findOne({owner: req.user._id});
        if(!find){
            await account.save()
            res.status(201).send(account)
        }
        else{
            res.status(400).send("Your account is already present in database please update your account")
        }
    }catch(e){
        res.status(400).send(e)
    }
})


// This is not working properly when we add new link 
router.patch("/accounts",auth , async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ["codechef", "codeforces", "hackerrank", "hackerearth", "spoj", "leetcode", "hackerblock"];
    const isValid = updates.every((update) => allowedUpdate.includes(update) );

    if(!isValid){
        res.status(400).send("Invalid request")
    }
    try{
        const account = await Account.findOne({owner: req.user._id})
        if(!account){
            return res.status(404).send()
        }
        updates.forEach((update) =>  account[update] = req.body[update] )
        // console.log(account); 
        await account.save()
        // console.log("working")
        res.send(account)
    }catch(e){
        res.status(500).send()
    }
})

router.get("/accounts",auth , async(req,res) => {
    try{
        const account = await Account.find({owner: req.user._id});
        if(!account){
            res.status(500).send();
        }
        res.status(200).send(account)
    }catch(e){
        res.status(500).send()
    }
})

router.post("/profile/account", async(req,res) => {
    try{
        // console.log(req.body.username);
        // res.send("hi");
        const user = await User.findOne({username: req.body.username});
        if(!user){
            throw new Error("Please enter a valid username")
            // res.status(404).send("Please enter a valid username");
        }
        const account = await Account.findOne({owner: user._id});
        if(!account){
            res.status(500).send("Internal server error");
        }
        res.send({account,name:user.name});
    }catch(e){
        // console.log(e);
        res.status(404).send(e);
    }
})


module.exports = router