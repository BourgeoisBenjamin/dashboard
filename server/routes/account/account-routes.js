const router = require('express').Router();
const pool = require('../../services/postgresql');
const KEYS = require('../../config/keys');
const https = require('https');
const JWTService = require("../../services/JWTToken");

// register a user
router.post('/register', function(req, res) {
    pool.getPool().query("INSERT INTO users (username, password, email, activate_email) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING id", [req.query.username, req.query.password, req.query.email, false], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                console.debug("REGISTER : User already exist.")
                res.sendStatus(409)
            } else {
                res.sendStatus(200);
            }
        }
    })
});

router.post('/login', function (req, res) {
    pool.getPool().query("SELECT id FROM users WHERE username = $1 OR email = $1 AND password = $2", [req.query.identifier, req.query.password], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401);
                res.json({message: "User not found."})
            } else {
                const token = JWTService.generateAccessToken({user_id: result.rows[0].id})
                res.json({JWTToken: token})
            }
        }
    })
})

module.exports = router;