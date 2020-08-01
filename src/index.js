const express = require("express")
require("./db/mongoose")
const userRouter = require("./routers/user")
const codeRouter = require("./routers/code")
const accountRouter = require("./routers/account")

const app = express()

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', "*");

    next();
}

const port = process.env.PORT

app.use(express.json())
app.use(allowCrossDomain);
app.use(userRouter)
app.use(codeRouter)
app.use(accountRouter)

app.listen(port, () => {
    console.log("Server is up on port ",port);
})