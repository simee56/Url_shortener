const mogoose = require('mongoose');

const userSchema = new mogoose.Schema({
    name : {
        type: String,
        required :true,
    },
    email : {
        type: String,
        required :true,
        unique :true
    },
    mobile :{
        type: Number,
        required :true,
        unique :true
    },
    password :{
        type: Number,
        required :true,
    },
    gender : {
        type: Number,
        required :true,
    },

}, {timestamps :true})

const userModel = mongoose.model('user',userSchema );

module.exports = {
    userModel
}