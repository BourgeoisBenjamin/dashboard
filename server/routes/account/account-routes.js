const router = require('express').Router();
const pool = require('../../services/postgresql');
const KEYS = require('../../config/keys');
const https = require('https');
const JWTService = require("../../services/JWTToken");
const emailValidator = require('email-validator')

// register a user
router.post('/register', function(req, res) {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    if (!email || !username || !password) {
        res.sendStatus(404);
        return;
    }
    // Removed trailing space
    email = email.trim();
    username = username.trim();

    if (!emailValidator.validate(email)) {
        res.sendStatus(404);
        return;
    }
    pool.getPool().query("INSERT INTO users (username, password, email, activate_email) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING id", [username, password, email, false], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.sendStatus(409)
            } else {
                res.sendStatus(200);
            }
        }
    })
});

router.post('/login', function (req, res) {
    pool.getPool().query("SELECT id FROM users WHERE username = $1 OR email = $1 AND password = $2", [req.body.identifier, req.body.password], (err, result) => {
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

router.delete('/delete', JWTService.authenticateToken, function (req, res) {
    //TODO: delete other tables
    pool.getPool().query("DELETE FROM users WHERE id = $1", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.sendStatus(200);
        }
    })
})

router.get('/infos', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("SELECT username, email, activate_email FROM users WHERE id = $1", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.json(result.rows)
        }
    })
})

module.exports = router;