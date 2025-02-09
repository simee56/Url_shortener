const jwt = require('jsonwebtoken');
const secretKey = "abpusa$6$+1";

function setUser(id, user) {   //this function will create tokens 
   const payLoad = {
    id,
    ...user,
   }
   return jwt.sign(payLoad,secretKey)
};

function getUser(id) {
     return sessionIdToUserMap.get(id)
};

module.exports = {
    setUser,
    getUser,
}