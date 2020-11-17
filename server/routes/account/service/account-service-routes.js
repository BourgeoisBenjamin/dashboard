const JWTService = require("../../../services/JWTToken");
const LoginWithTwitter = require('login-with-twitter');
const pool = require('../../../services/postgresql');
const KEYS = require('../../../config/keys');
const router = require('express').Router();
const waitUntil = require('wait-until');
const { v4: uuidv4 } = require('uuid');

const tw = new LoginWithTwitter({
    consumerKey: KEYS.TWITTER_APP.APP_API_KEY,
    consumerSecret: KEYS.TWITTER_APP.APP_API_KEY_SECRET,
    callbackUrl: KEYS.TWITTER_APP.APP_API_CALLBACK_CONNECT
})

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

let services = Array();

// init connection return uuid
router.get('/init', JWTService.authenticateToken, (req, res) => {

    let newService = {uuid: uuidv4(), id: req.user.user_id, connect: false, error: false};
    services.push(newService);

    res.status(200);
    res.json({ uuid: newService.uuid });
})

// auth with twitter
router.get('/twitter/connect', (req, res) => {
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

        pool.getPool().query("INSERT INTO twitter_service (id_user, twitter_id, token, tokensecret) VALUES ($1, $2, $3, $4) ON CONFLICT (id_user) DO UPDATE SET twitter_id = $2, token = $3, tokensecret = $4", [service.id, user.userId, user.userToken, user.userTokenSecret], (err, result) =>  {
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