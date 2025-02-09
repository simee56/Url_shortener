const jwt = require('jsonwebtoken');
const secretKey = "abpusa$6$+1";

function setUser( user) {   //this function will create tokens 
   return jwt.sign(user,secretKey)
};

function getUser(token) {
    if(!token)
        return null;
    
    return jwt.verify(token,secretKey)
};

module.exports = {
    setUser,
    getUser,
}