const JWTService = require("../../../services/JWTToken");
const LoginWithTwitter = require('login-with-twitter');
const pool = require('../../../services/postgresql');
const verifier = require('google-id-token-verifier');
const GoogleLogin = require('google-oauth-login');
const KEYS = require('../../../config/keys');
const router = require('express').Router();
const waitUntil = require('wait-until');
const { v4: uuidv4 } = require('uuid');

const tw = new LoginWithTwitter({
    consumerKey: KEYS.TWITTER_APP.APP_API_KEY,
    consumerSecret: KEYS.TWITTER_APP.APP_API_KEY_SECRET,
    callbackUrl: KEYS.TWITTER_APP.APP_API_CALLBACK_CONNECT
})

const google = new GoogleLogin({
    clientId: KEYS.GOOGLE_APP.APP_API_KEY,
    clientSecret: KEYS.GOOGLE_APP.APP_API_KEY_SECRET,
    redirectUri: KEYS.GOOGLE_APP.APP_API_CALLBACK_CONNECT,
    scope: KEYS.GOOGLE_APP.APP_API_SCOPE,
    accessType: KEYS.GOOGLE_APP.APP_API_ACCESS_TYPE, // to get refresh token pass access type: offline
    prompt: KEYS.GOOGLE_APP.APP_API_PROMPT, // to prompt user everytime
})

// get services list
router.get('/', JWTService.authenticateToken, function(req, res) {

    const twitter_service = {
        service_name : 'twitter',
        connected : false
    }
    const youtube_service = {
        service_name : 'youtube',
        connected : false
    }
    const weather_service = {
        service_name : 'weather',
        connected : false
    }
    const covid_service = {
        service_name : 'covid',
        connected : false
    }

    pool.getPool().query("SELECT activate FROM twitter_service WHERE id_user = $1", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length)
                twitter_service.connected = false;
            else {
                twitter_service.connected = result.rows[0].activate
            }
        }
    })
    pool.getPool().query("SELECT activate FROM youtube_service WHERE id_user = $1", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length)
                youtube_service.connected = false;
            else {
                youtube_service.connected = result.rows[0].activate
            }
        }
    })
    pool.getPool().query("SELECT activate FROM weather_service WHERE id_user = $1", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length)
                weather_service.connected = false;
            else {
                weather_service.connected = result.rows[0].activate
            }
        }
    })
    pool.getPool().query("SELECT activate FROM covid_service WHERE id_user = $1", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length)
                covid_service.connected = false;
            else {
                covid_service.connected = result.rows[0].activate
            }
            res.status(200)
            const response = []
            response.push(twitter_service)
            response.push(youtube_service)
            response.push(weather_service)
            response.push(covid_service)
            res.json({data: response})
        }
    })
});

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

// connect covid service
router.post('/covid/connect', JWTService.authenticateToken, function(req, res) {
    pool.getPool().query("INSERT INTO covid_service (id_user, activate) VALUES ($1, $2) ON CONFLICT (id_user) DO UPDATE SET activate = $2", [req.user.user_id, true], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.sendStatus(200);
        }
    })
});

// disconnect weather service
router.post('/covid/disconnect', JWTService.authenticateToken, function(req, res) {
    pool.getPool().query("UPDATE covid_service SET activate = $2 WHERE id_user = $1", [req.user.user_id, false], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.sendStatus(200);
        }
    })
});

let services = Array();

// init connection return uuid
router.get('/init', JWTService.authenticateToken, (req, res) => {

    let newService = {uuid: uuidv4(), id: req.user.user_id, connect: false, error: false};
    services.push(newService);

    res.status(200);
    res.json({ uuid: newService.uuid });
})

// auth with twitter
router.post('/twitter/connect', (req, res) => {
    tw.login((err, tokenSecret, url) => {
        if (err) {
            let service = services.find((elem) => {
                return (elem.uuid === req.query.uuid);
            });
            service.error = true;
            res.send("<script>window.close();</script>");
        }

        // Save the OAuth token secret for use in your /twitter/callback route
        req.session.tokenSecret = tokenSecret;
        req.session.uuid = req.query.uuid;

        res.redirect(url)
    })
})

// confirm oauth twitter
router.get('/twitter/connect/redirect', (req, res) => {
    tw.callback({
        oauth_token: req.query.oauth_token,
        oauth_verifier: req.query.oauth_verifier
    }, req.session.tokenSecret, (err, user) => {
        if (err) {
            let service = services.find((elem) => {
                return (elem.uuid === req.session.uuid);
            });
            service.error = true;
            res.send("<script>window.close();</script>");
        }

        // Delete the tokenSecret securely
        delete req.session.tokenSecret;

        let service = services.find((elem) => {
            return (elem.uuid === req.session.uuid);
        });

        pool.getPool().query("INSERT INTO twitter_service (id_user, twitter_id, token, tokensecret, activate) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id_user) DO UPDATE SET twitter_id = $2, token = $3, tokensecret = $4, activate = $5", [service.id, user.userId, user.userToken, user.userTokenSecret, true], (err, result) =>  {
            if (err) {
                service.error = true;
            } else {
                service.connect = true;
            }
            delete req.session.uuid;
            res.send("<script>window.close();</script>");
        });
    });
});

router.post('/twitter/disconnect', JWTService.authenticateToken, (req, res) => {

    pool.getPool().query("UPDATE twitter_service SET activate = $1 WHERE id_user = $2", [false, req.user.user_id], (err, result) =>  {
        if (err) {
            res.status(200);
        } else {
            res.status(503);
            res.json({message: "Service Unavailable"})
        }
    });
});

// auth with google
router.post('/google/connect', async (req, res) => {

    // generate the URL that Google will use for login and consent dialog
    const result = await google.getGoogleOauthUrl();

    // save uuid
    req.session.uuid = req.query.uuid;

    // redirect the user to consent screen
    res.redirect(result)
})

// confirm google oauth
router.get('/google/connect/redirect', async (req, res) => {
    const oAuthParam = {
        code: req.query.code,
        scope: req.query.scope,
    }
    const result = await google.getAccessTokenAsync(oAuthParam)

    let service = services.find((elem) => {
        return (elem.uuid === req.session.uuid);
    });

    pool.getPool().query("INSERT INTO youtube_service (id_user, activate, access_token, expires_in, refresh_token, scope, token_type, id_token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id_user) DO UPDATE SET activate = $2, access_token = $3, expires_in = $4, refresh_token = $5, scope = $6, token_type = $7, id_token = $8", [service.id, true, result.access_token, result.expires_in, result.refresh_token, result.scope, result.token_type, result.id_token], (err, result) =>  {
        if (err) {
            service.error = true;
        } else {
            service.connect = true;
        }
        delete req.session.uuid;
        res.send("<script>window.close();</script>");
    });
})

router.post('/google/disconnect', JWTService.authenticateToken, (req, res) => {

    pool.getPool().query("UPDATE youtube_service SET activate = $1 WHERE id_user = $2", [false, req.user.user_id], (err, result) =>  {
        if (err) {
            res.status(200);
        } else {
            res.status(503);
            res.json({message: "Service Unavailable"})
        }
    });
});

// return login successful or not
router.get('/connect', JWTService.authenticateToken, (req, res) => {

    let service = services.find((elem) => {
        return (elem.uuid === req.query.uuid);
    });

    waitUntil(500, Infinity, () => {
        if (service.error)
            return 2;
        else if (service.connect)
            return true;
        return false;
    }, (result) => {
        if (result === true) {
            services.splice(services.indexOf(service), 1);
            res.status(200)
        } else {
            res.json({code: 401})
        }
    });
});

module.exports = router;