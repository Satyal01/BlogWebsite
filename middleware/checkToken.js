const {verifyToken }  = require('../services/auth')
const {inBlackList} = require("./blacklistToken")


function checkIfUserLogin(req, res, next){
    // console.log(req);
    const token = req.cookies?.uid;
    if(!token){
        return next();
    }
    if(inBlackList(token)) return res.redirect("/login");

    const user = verifyToken(token);
    // console.log("verifyed ", user);
    if(!user) return res.redirect("/login");
    
    req.user = user;
    next();
}


function restricTo(role=[]){
    return (req, res, next)=>{
        // console.log("restricTo called");
        if(!req.user) return res.redirect("/login");
        if(!role.includes(req.user.role)) return res.end("unauthorized");
        return next();
    }
}


module.exports = {
    checkIfUserLogin,
    restricTo
}