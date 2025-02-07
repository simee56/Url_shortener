const User = require('../models/user');

async function handleUserSignUp(req, res) {
    const { name, email, password, mobile, gender } = req.body;
    await User.create({
        name,
        email,
        password,
        mobile,
        gender
    });
    return res.render("home");
}

module.exports = {
    handleUserSignUp,
}