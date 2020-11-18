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
    pool.getPool().query("DELETE FROM country_case_covid WHERE id_covid_service IN (SELECT id FROM covid_service WHERE id_user = $1)", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
    pool.getPool().query("DELETE FROM summary_country_covid WHERE id_covid_service IN (SELECT id FROM covid_service WHERE id_user = $1)", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
    pool.getPool().query("DELETE FROM city_meteo_weather WHERE id_weather_service IN (SELECT id FROM weather_service WHERE id_user = $1)", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
    pool.getPool().query("DELETE FROM search_tweets_twitter WHERE id_twitter_service IN (SELECT id FROM twitter_service WHERE id_user = $1)", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
    pool.getPool().query("DELETE FROM last_tweets_twitter WHERE id_twitter_service IN (SELECT id FROM twitter_service WHERE id_user = $1)", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
    pool.getPool().query("DELETE FROM channels_videos_youtube WHERE id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $1)", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
    pool.getPool().query("DELETE FROM subscribers_channels_youtube WHERE id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $1)", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
    pool.getPool().query("DELETE FROM views_video_youtube WHERE id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $1)", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
    pool.getPool().query("DELETE FROM comments_video_youtube WHERE id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $1)", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
    pool.getPool().query("DELETE FROM covid_service WHERE id_user = $1", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
    pool.getPool().query("DELETE FROM weather_service WHERE id_user = $1", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
    pool.getPool().query("DELETE FROM twitter_service WHERE id_user = $1", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
    pool.getPool().query("DELETE FROM youtube_service WHERE id_user = $1", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })

    // CETTE REQUETE EN DERNIERE
    pool.getPool().query("DELETE FROM users WHERE id = $1", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
})

router.get('/infos', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("SELECT username, email, activate_email, tier_username, tier_name FROM users WHERE id = $1", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.json(result.rows)
        }
    })
})

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