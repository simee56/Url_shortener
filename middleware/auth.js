const { getUser } = require('../services/auth');

//AUTHENTICATION
function checkForAuthentication(req, res, next) {

    const tokenCookie = req.cookies?.token;   //checks if there any cookie exists
    req.user = null;

    if (!tokenCookie) return next();
    
    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}

//AUTHORIZATION
function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect("/login");

        if (!roles.includes(req.user.role)) {
            return res.end("UnAuthorized");
        }
        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}