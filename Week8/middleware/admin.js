const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require('../config');


function adminMiddleware(req,res,next) {
    const token = req.headers.token;

    const verification = jwt.verify(token, JWT_ADMIN_PASSWORD);

    if(verification) {
        req.id = verification.id;
        next()
    } else {
        res.json({
            status: "You are not signin"
        })
    }
}

module.exports = {
    adminMiddleware
}