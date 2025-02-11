const { v4: uuidv4 } = require('uuid');

const User = require('../models/user');
const { setUser } = require('../services/auth');

async function handleUserSignUp(req, res) {
    const { name, email, password, mobile, gender } = req.body;
    await User.create({
        name,
        email,
        password,
        mobile,
        gender
    });
    return res.redirect("/");
}

async function handleUserLogIn(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.render("login", {
            error: "Invalid email or password"
        });
    }

    const token = setUser({ userId: user._id, email: user.email });
    // res.cookie('uid', token);     //cretae cookie

    return res.json({token});
}

module.exports = {
    handleUserSignUp,
    handleUserLogIn
}