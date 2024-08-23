const userModel = require("../../model/User");
const {createHmac} = require("crypto")
const {getToken}  = require("../../services/auth")
const {blackListAdd} = require("../../middleware/blacklistToken")

async function handleLogin(req, res){
    const body= req.body;
    const user = await userModel.findOne({email:body.email})
    const auth = validatePassword(body,user)
    if(!auth){
        return res.render("login.ejs",{data:{err:"email or password invalid"}})
    }
    const token = getToken(user)
    res.cookie("uid", token)
    res.redirect("/home");
}

 function validatePassword(body, user){
    if(!user) return false;
    // console.log("body", body);
    // console.log(typeof user.salt)
    const newhash = createHmac("sha256",user.salt).update(body.password).digest('hex');
    // console.log("new Has ", newhash)
    // console.log("prev hash", user.password)
    return newhash===user.password
    
}


async function handleSignup(req, res){
    console.log("signup");
    const {
        name,
        email,
        password
    } = req.body;
    const user =await userModel.create({
        name,
        email,
        password
    }).then((data)=>{
        return data
    }).catch( err => console.log("user created err", err));
    const token = getToken(user);
    res.cookie("uid",token);
    res.redirect("/home");
}



module.exports = {
    handleSignup,
    handleLogin
}