const mongoose = require("mongoose")
const validator = require("validator")

const Account = mongoose.model('Account', {
    codechef: {
        type: String,
        trim: true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Codechef link must be url")
            }
            if(!value.includes("users")){
                throw new Error("Codechef link must be a user profile")
            }
            if(!value.includes("codechef")){
                throw new Error("Please check codechef link")
            }
        }
    },
    codeforces:{
        type: String,
        trim: true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Codeforces link must be url")
            }
            if(!value.includes("profile")){
                throw new Error("Codeforces link must be a user profile")
            }
            if(!value.includes("codeforces")){
                throw new Error("Please check codeforces link")
            }
        }
    },
    hackerrank:{
        type: String,
        trim: true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("hackerrank link must be url")
            }
            if(!value.includes("hackerrank")){
                throw new Error("Please check hackerrank link")
            }
        }
    },
    hackerearth:{
        type: String,
        trim: true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("hackerearth link must be url")
            }
            if(!value.includes("@")){
                throw new Error("hackerearth link must be a user profile")
            }
            if(!value.includes("hackerearth")){
                throw new Error("Please check hackerearth link")
            }
        }
    },
    spoj:{
        type: String,
        trim: true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Spoj link must be url")
            }
            if(!value.includes("spoj")){
                throw new Error("Please check spoj link")
            }
        }
    },
    leetcode:{
        type: String,
        trim: true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Leetcode link must be url")
            }
            if(!value.includes("leetcode")){
                throw new Error("Please check leetcode link")
            }
        }
    },
    hackerblock:{
        type: String,
        trim: true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Hackerblock link must be url")
            }
            if(!value.includes("users")){
                throw new Error("Hackerblock link must be a user profile")
            }
            if(!value.includes("hackerblock")){
                throw new Error("Please check hackerblock link")
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Account