const mongoose = require('mongoose');


function connect(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("db connected");
    }).catch(err => console.log("db erro", err));
}


module.exports = connect;