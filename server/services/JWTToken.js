const jwt = require("jsonwebtoken");
const KEYS = require("../config/keys");

function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, KEYS.JWT.JWT_SECRET, (err, user_id) => {
        if (err) {
            console.debug(err)
            return res.sendStatus(403)
        }
        req.user_id = user_id
        next() // pass the execution off to whatever request the client intended
    })
}

// id is in the form { user_id: 1 }
// ^^the above object structure is completely arbitrary
function generateAccessToken(user_id) {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign(user_id, KEYS.JWT.JWT_SECRET, { expiresIn: '1800s' });
}

module.exports = {
    authenticateToken,
    generateAccessToken
}