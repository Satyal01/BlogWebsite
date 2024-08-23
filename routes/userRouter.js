const express = require("express");
const {handleLogin, handleSignup}  = require("../controllers/login/handleLoginSignup")
const { restricTo} = require("../middleware/checkToken")
const {handleAllBlog} = require("../controllers/blog/handleHome")
const userRouter = express.Router();



userRouter.route('/home')
.get(handleAllBlog)

userRouter.route("/admin")
.all(restricTo(["ADMIN"]))
.get((req, res)=>{
    res.end("admin page");
})


userRouter.route("/login")
.get((req, res)=>{
    res.render("login", {data : false})
})
.post(handleLogin);



userRouter.route('/Signup')
.get((req,res)=>{
    res.render("Signup.ejs",{data: false})
})
.post(handleSignup);

userRouter.route("/logout")
.get((req, res)=>{
    res.clearCookie("uid").redirect("/login");
})

module.exports = userRouter
