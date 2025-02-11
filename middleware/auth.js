const { getUser } = require('../services/auth');

async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.headers['Authorization'];

    if (!userUid) return res.redirect('/login');
    const token = userUid.split('Bearer ')[1];    //at the first index there will be token

    const user = getUser(token);              //verifies ijson web token

    if (!user) return res.redirect('/login');   //if not verified

    req.user = user;
    next();

}

async function chechAuth(req, res, next) {
    const userUid = req.headers['authorization'];
    const token = userUid.split('Bearer ')[1];    //at the first index there will be token

    const user = getUser(token);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    chechAuth
}