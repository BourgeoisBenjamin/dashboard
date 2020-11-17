const router = require('express').Router();
const pool = require('../../../services/postgresql');
const KEYS = require('../../../config/keys');
const https = require('https');
const JWTService = require("../../../services/JWTToken");

// connect weather service
router.post('/weather/connect', JWTService.authenticateToken, function(req, res) {
    pool.getPool().query("INSERT INTO weather_service (id_user, api_key, activate) VALUES ($1, $2, $3) ON CONFLICT (id_user) DO UPDATE SET api_key = $2, activate = $3", [req.user.user_id, KEYS.WEATHER_SERVICE.API_KEY, true], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.sendStatus(200);
        }
    })
});

// disconnect weather service
router.post('/weather/disconnect', JWTService.authenticateToken, function(req, res) {
    pool.getPool().query("UPDATE weather_service SET activate = $2 WHERE id_user = $1", [req.user.user_id, false], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.sendStatus(200);
        }
    })
});

module.exports = router;