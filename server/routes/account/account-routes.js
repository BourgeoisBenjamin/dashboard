const router = require('express').Router();
const pool = require('../../services/postgresql');
const KEYS = require('../../config/keys');
const https = require('https');
const JWTService = require("../../services/JWTToken");

// register a user
router.post('/register', function(req, res) {
    pool.getPool().query("INSERT INTO users (username, password, email, activate_email) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING id", [req.query.username, req.query.password, req.query.email, false], (err, result) => {
        if (result.rows.empty()) {
            console.debug("REGISTER : User already exist.")
            res.sendStatus(409)
        } else {
            const token = JWTService.generateAccessToken({ user_id: 1 });
            res.json(token);
        }
    })
});

module.exports = router;