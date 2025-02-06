const mogoose = require('mongoose');

const userSchema = new mogoose.Schema({
    name : {
        type: String,
        require :true
    },
    email : {
        type: String,
        require :true,
        unique :true
    },
    mobile :{
        type: Number,
        require :true,
        unique :true
    },
    password :{
        type: Number,
        require :true
    },
    gender : {
        type: Number,
        require :true
    },

}, {timestamps :true})

const userModel = mongoose.model('user',userSchema );

module.exports = {
    userModel
}