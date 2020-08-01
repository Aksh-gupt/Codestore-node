const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const uniqueString = require('unique-string')
const Account = require("./account")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter a valid email address")
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Password must not contain 'password' in it.")
            }
        }
    },
    resetId:{
        type: String,
        trim: true
    },
    tokens:[{
        token:{
            type:String,
            required: true
        }
    }]
}) 

userSchema.virtual('codes',{
    ref: 'Code',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('accounts',{
    ref: 'Account',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.resetId;
    delete userObject.email;

    return userObject
}

userSchema.methods.generateResetId = async function(){
    const user = this
    const resetId = uniqueString();
    // console.log(resetId);
    user.resetId = resetId
    await user.save()
    return resetId
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jsonwebtoken.sign({_id: user._id.toString()}, process.env.JWT_TOKEN)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error("No existing user with this email id")
    }
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error("Please check your password")
    }
    return user
}

userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
})

userSchema.pre('remove', async function(next){
    const user = this

    await Account.deleteOne({owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User