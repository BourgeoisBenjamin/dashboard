const router = require('express').Router();
const pool = require('../../services/postgresql');
const KEYS = require('../../config/keys');
const https = require('https');
const JWTService = require("../../services/JWTToken");
const emailValidator = require('email-validator');
const cryptoRandomString = require('crypto-random-string');

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

    const token = cryptoRandomString({length: 250, type: 'alphanumeric'});
    pool.getPool().query("INSERT INTO users (username, password, email, token_email) VALUES ($1, crypt($2, gen_salt('bf')), $3, $4) ON CONFLICT DO NOTHING RETURNING id", [username, password, email, token], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.sendStatus(409)
            } else {
                console.log('http://localhost:3000/email/verify/' + token);
                res.sendStatus(200);
            }
        }
    })
});

router.post('/login', function (req, res) {
    pool.getPool().query("SELECT id FROM users WHERE (username = $1 OR email = $1) AND password = crypt($2, password)", [req.body.identifier, req.body.password], (err, result) => {
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
            res.json(result.rows[0])
        }
    })
})

router.post('/infos', JWTService.authenticateToken, function (req, res) {
    let email = req.body.email;
    let username = req.body.username;

    email = email.trim();
    username = username.trim();

    if (!username || !email) {
        res.sendStatus(404);
        return;
    }

    if (!emailValidator.validate(email)) {
        res.sendStatus(404);
        return;
    }

    const token = cryptoRandomString({length: 250, type: 'alphanumeric'});

    pool.getPool().query("SELECT email FROM users WHERE id = $1", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (result.rows[0].email !== email) {
                pool.getPool().query("UPDATE users SET username = $1, email = $2, activate_email = false, token_email = $3 WHERE id = $4", [username, email, token, req.user.user_id], (err, result) => {
                    if (err) {
                        res.status(503);
                        res.json({message: "Service Unavailable"})
                    } else {
                        console.log('http://localhost:3000/email/verify/' + token);

                        res.sendStatus(200)
                    }
                })
            } else {
                pool.getPool().query("UPDATE users SET username = $1 WHERE id = $2", [username, req.user.user_id], (err, result) => {
                    if (err) {
                        res.status(503);
                        res.json({message: "Service Unavailable"})
                    } else {
                        res.sendStatus(200)
                    }
                })
            }
        }
    });
})

router.post('/email/send', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("SELECT token_email FROM users WHERE id = $1", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            console.log('http://localhost:3000/email/verify/' + result.rows[0].token_email);
            res.sendStatus(200);
        }
    })
});

router.post('/email/verify/', function(req, res) {
    if (!req.body.token_email) {
        res.sendStatus(404);
        return;
    }
    pool.getPool().query("UPDATE users SET token_email = null, activate_email = true WHERE token_email = $1", [req.body.token_email], (err, result) => {
        if (err || result.rowCount === 0) {
            res.status(503);
            res.json({message: "Service Unavailable"});
            return;
        }
        res.sendStatus(200);
    });
});

module.exports = router;