const mongoose = require("mongoose")
const validator = require("validator")

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

// const me = new User({
//     name: "  Akshat Gupta",
//     username: "aksh_2000",
//     email: "akshatgupta486@gmail.com",
//     password: "akshatfa"
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })