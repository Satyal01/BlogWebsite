const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

function getToken(user){
    const payload = {
        name : user.name,
        email : user.email,
        profileImageUrl : user.profileImageUrl,
        role : user.role,
        _id : user._id,
    }
    // create token using jwt.sign and we can set expiration duration in token by pasing the third argumnet to sing function 
    return jwt.sign(payload,secretKey);

}


function verifyToken(token){
    if(!token) return null
    try{
        return jwt.verify(token,secretKey)
    }catch(err){
        return null
    }

}

module.exports = {
    verifyToken,
    getToken
}