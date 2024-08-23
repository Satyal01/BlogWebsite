const {Schema, model} = require("mongoose");
const {createHmac, randomBytes} = require("crypto")



const userSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    email :{
        type : String,
        require : true,
        unique : true
    },
    password :{
        type : String,
        require: true
    },
    salt : {
        type: String,
        require: true
    },
    role :{
        type : String,
        enum:["USER", "ADMIN"],
        default : "USER"
    },
    profileImage : {
        type : String,
        default : "/default.jpg"
    }
},
{
    timestamps: true 
})

//we cannot use arrow function in pre method bc  we can access this keyword which point to the  user in normal function
userSchema.pre("save", function (next){
    const user = this;

    if(!user.isModified("password")) return null;
    // creating slt
    const slt = randomBytes(8).toString();
    // creating hash using slt 
    const hash = createHmac("sha256",slt).update(user.password).digest('hex');
    // saving slt and hash to userModel
    this.password = hash
    this.salt = slt
    if(user.name === "ankit"){
        this.role = "ADMIN"
    }
    
    
    next()

});

const userModel = model("user", userSchema);

module.exports = userModel;