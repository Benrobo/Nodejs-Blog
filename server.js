const path = require("path")
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const ejs = require("ejs")
const app = express()

// all router object
const {router} = require("./router/router")
// middleware
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "/views")))
// EJS
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

 
app.get("/", (req, res)=>{
    res.render("index")
})

// alroutes
app.use(router)

// listen on port
const port = process.env.port || 5000
app.listen(port)