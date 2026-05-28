const mongoose = require('mongoose');

const user_schema = {
    name:{type:String, required:true},
    email:{type:String, required:true}
}

const user = mongoose.model("User",user_schema,"User")

module.exports = user