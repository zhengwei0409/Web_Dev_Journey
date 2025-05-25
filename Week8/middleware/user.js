const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require('../config');

function userMiddleware(req,res,next) {
    const token = req.headers.token;

    const verification = jwt.verify(token,JWT_USER_PASSWORD);

    if(verification) {
        req.id = verification.id;
        next();
    } else {
        res.json({
            status: "Please signin"
        })
    }
}

module.exports = {
    userMiddleware
}