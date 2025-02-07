const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: Number,
        required: true,
    },
    gender: {
        type: Number,
        required: true,
    },

}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = User
