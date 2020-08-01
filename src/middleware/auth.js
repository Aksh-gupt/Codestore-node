const User = require("../models/user")
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    // console.log("auth running");
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        // console.log(token);
        const decoded = jwt.verify(token,process.env.JWT_TOKEN)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        // console.log(req.user.name);
        next()
    }catch(e){
        res.status(401).send("Please authenticate")
    }
}

module.exports = auth