const router = require('express').Router();
const pool = require('../../services/postgresql');
const KEYS = require('../../config/keys');
const https = require('https');
const JWTService = require("../../services/JWTToken");
const emailValidator = require('email-validator');
const cryptoRandomString = require('crypto-random-string');
const nodemailer = require('nodemailer');

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
    pool.getPool().query("INSERT INTO users (username, password, email, token_email) VALUES ($1, crypt($2, gen_salt('bf')), $3, $4) ON CONFLICT DO NOTHING RETURNING email", [username, password, email, token], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.sendStatus(409)
            } else {
                let transporter = nodemailer.createTransport({
                    host: KEYS.MAIL.SMTP,
                    port: KEYS.MAIL.PORT,
                    secure: true,
                    auth: {
                        user: KEYS.MAIL.EMAIL,
                        pass: KEYS.MAIL.PASSWORD,
                    },
                });

                let info = transporter.sendMail({
                    from: '"Dashboard 👻" <' + KEYS.MAIL.EMAIL + '>',
                    to: result.rows[0].email,
                    subject: "✔ Confirm your account",
                    text: "Welcome to your dashboard ! Confirm your account here : " + KEYS.SERVER.CLIENT_HOME_PAGE_URL + "/verify/" + token, // plain text body
                    html: "Welcome to your dashboard,<br>Click <a href='" + KEYS.SERVER.CLIENT_HOME_PAGE_URL + "/verify/" + token + "'>here</a> to confirm your account." +
                        " Or, copy this link in your browser : " + KEYS.SERVER.CLIENT_HOME_PAGE_URL + "/verify/" + token +
                        "<br>See you soon !", // html body
                });
                pool.getPool().query("INSERT INTO weather_service (id_user, api_key, activate) VALUES ($1, $2, $3) ON CONFLICT (id_user) DO UPDATE SET api_key = $2, activate = $3", [result.rows[0].id, KEYS.WEATHER_SERVICE.API_KEY, true], (err, result) => {})
                pool.getPool().query("INSERT INTO covid_service (id_user, activate) VALUES ($1, $2) ON CONFLICT (id_user) DO UPDATE SET activate = $2", [result.rows[0].id, true], (err, result) => {})
                res.sendStatus(200);
            }
        }
    })
});

router.post('/login', function (req, res) {

    let identifier = req.body.identifier;
    let password = req.body.password;

    if (!identifier || !password) {
        res.sendStatus(404);
        return;
    }
    // Removed trailing space
    identifier = identifier.trim();
    password = password.trim();

    pool.getPool().query("SELECT id FROM users WHERE (username = $1 OR email = $1) AND password = crypt($2, password)", [identifier, password], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401);
                res.json({message: "User not found."})
            } else {
                const token = JWTService.generateAccessToken({user_id: result.rows[0].id})
                console.debug('JWT TOKEN : ' + token)
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
                        let transporter = nodemailer.createTransport({
                            host: KEYS.MAIL.SMTP,
                            port: KEYS.MAIL.PORT,
                            secure: true,
                            auth: {
                                user: KEYS.MAIL.EMAIL,
                                pass: KEYS.MAIL.PASSWORD,
                            },
                        });

                        let info = transporter.sendMail({
                            from: '"Dashboard 👻" <' + KEYS.MAIL.EMAIL + '>',
                            to: email,
                            subject: "✔ Confirm your email",
                            text: "Hello, Confirm your email here : " + KEYS.SERVER.CLIENT_HOME_PAGE_URL + "/email/verify/" + token, // plain text body
                            html: "Hello,<br>Click <a href='" + KEYS.SERVER.CLIENT_HOME_PAGE_URL + "/email/verify/" + token + "'>here</a> to confirm your email." +
                                " Or, copy this link in your browser : " + KEYS.SERVER.CLIENT_HOME_PAGE_URL + "/email/verify/" + token +
                                "<br>See you soon !", // html body
                        });
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
    pool.getPool().query("SELECT token_email, email FROM users WHERE id = $1", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401);
                res.json({message: "User not found."})
            } else {
                let transporter = nodemailer.createTransport({
                    host: KEYS.MAIL.SMTP,
                    port: KEYS.MAIL.PORT,
                    secure: true,
                    auth: {
                        user: KEYS.MAIL.EMAIL,
                        pass: KEYS.MAIL.PASSWORD,
                    },
                });

                let info = transporter.sendMail({
                    from: '"Dashboard 👻" <' + KEYS.MAIL.EMAIL + '>',
                    to: result.rows[0].email,
                    subject: "✔ Confirm your email",
                    text: "Hello, Confirm your email here : " + KEYS.SERVER.CLIENT_HOME_PAGE_URL + "/email/verify/" + result.rows[0].token_email, // plain text body
                    html: "Hello,<br>Click <a href='" + KEYS.SERVER.CLIENT_HOME_PAGE_URL + "/email/verify/" + result.rows[0].token_email + "'>here</a> to confirm your email." +
                        " Or, copy this link in your browser : " + KEYS.SERVER.CLIENT_HOME_PAGE_URL + "/email/verify/" + result.rows[0].token_email +
                        "<br>See you soon !", // html body
                });
                res.sendStatus(200);
            }
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