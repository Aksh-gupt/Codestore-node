const mongoose = require("mongoose")
const validator = require("validator")

const Code = mongoose.model('Code', {
    title:{
        type: String,
        required: true,
        trim: true
    },
    question: {
        type: String,
        trim: true
    },
    answer:{
        type: String,
        required: true
    },
    tags:[{
        type: String,
        trim: true
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Code