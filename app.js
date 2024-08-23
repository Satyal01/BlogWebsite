require("dotenv").config();
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const cookeParser = require('cookie-parser');
const app = express();

const userRouter  = require("./routes/userRouter")
const blogRouter  = require("./routes/blogRouter")
const {checkIfUserLogin}  = require('./middleware/checkToken')

const PORT = process.env.PORT;

// database connection
const connect = require("./dbconnection");
connect();

// setting ejs engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

// middleware +  integrating routers

app.use(express.json()); 
app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({extended: false}))   //used to parse form data given by user 
app.use(cookeParser());
app.use(checkIfUserLogin);


app.use("/", userRouter);
app.use("/blog",blogRouter);


app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})