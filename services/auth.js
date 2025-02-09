const jwt = require('jsonwebtoken');
const secretKey = "abpusa$6$+1";

function setUser( user) {   //this function will create tokens 
   return jwt.sign(user,secretKey)
};

function getUser(id) {
     return sessionIdToUserMap.get(id)
};

module.exports = {
    setUser,
    getUser,
}