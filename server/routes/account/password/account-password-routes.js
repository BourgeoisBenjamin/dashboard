const router = require('express').Router();
const pool = require('../../../services/postgresql');
const KEYS = require('../../../config/keys');
const https = require('https');
const emailValidator = require('email-validator');
const cryptoRandomString = require('crypto-random-string');
const { v4: uuidv4 } = require('uuid');

router.post('/lost', function(req, res) {

    let email = req.body.email;
    let username = req.body.username;

    if (!email || !username) {
        res.sendStatus(400);
        return;
    }
    // Removed trailing space
    email = email.trim();
    username = username.trim();

    if (!emailValidator.validate(email)) {
        res.sendStatus(400);
        return;
    }

    let uuid = uuidv4();

    pool.getPool().query("UPDATE users SET reset_password = $1 WHERE email = $2 AND username = $3 RETURNING id", [uuid, email, username], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"});
            return;
        } else if (result.rowCount === 0) {
            res.status(400)
            res.json({message: "User not found"});
            return;
        }
        res.sendStatus(200);
    });
});

module.exports = router;