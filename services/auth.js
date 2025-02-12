const jwt = require('jsonwebtoken');
const secretKey = "abpusa$6$+1";

function setUser(user) {   //this function will create tokens 
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role : user.role,
    },
        secretKey);
};

function getUser(token) {
    if (!token) return null;

    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        console.error("JWT verification failed:", err);
     
        return null;
    }
};


module.exports = {
    setUser,
    getUser,
}