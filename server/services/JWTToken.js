const jwt = require("jsonwebtoken");
const KEYS = require("../config/keys");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, KEYS.JWT.JWT_SECRET, (err, user) => {
        if (err) {
            console.debug(err)
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

function generateAccessToken(user_id) {
    return jwt.sign(user_id, KEYS.JWT.JWT_SECRET, { expiresIn: '3600s' });
}

module.exports = {
    authenticateToken,
    generateAccessToken
}