const LoginWithTwitter = require('login-with-twitter')
const JWTService = require("../../../../services/JWTToken")
const router = require('express').Router()
const waitUntil = require('wait-until')
const { v4: uuidv4 } = require('uuid')
const URL = require('url')

const KEYS = require('../../../../config/keys')
const pool = require('../../../../services/postgresql')

const tw = new LoginWithTwitter({
    consumerKey: KEYS.TWITTER_APP.APP_API_KEY,
    consumerSecret: KEYS.TWITTER_APP.APP_API_KEY_SECRET,
    callbackUrl: KEYS.TWITTER_APP.APP_API_CALLBACK
})

let clients = Array();

// init connection return uuid
router.get('/init', (req, res) => {

    let newUser = {uuid: uuidv4(), login: false, id: -1, error: false};
    clients.push(newUser);

    res.status(200);
    res.json({ uuid: newUser.uuid });
})

// auth with twitter
router.get('/twitter', (req, res) => {
    tw.login((err, tokenSecret, url) => {
        if (err) {
            let client = clients.find((elem) => {
                return (elem.uuid === req.query.uuid);
            });
            client.error = true;
            res.send("<script>window.close();</script>");
        }

        // Save the OAuth token secret for use in your /twitter/callback route
        req.session.tokenSecret = tokenSecret;
        req.session.uuid = req.query.uuid;

        res.redirect(url)
    })
})

// get user access token
router.get('/twitter/redirect', (req, res) => {
    tw.callback({
        oauth_token: req.query.oauth_token,
        oauth_verifier: req.query.oauth_verifier
    }, req.session.tokenSecret, (err, user) => {
        if (err) {
            let client = clients.find((elem) => {
                return (elem.uuid === req.session.uuid);
            });
            client.error = true;
            res.send("<script>window.close();</script>");
        }

        // Delete the tokenSecret securely
        delete req.session.tokenSecret;

        let client = clients.find((elem) => {
            return (elem.uuid === req.session.uuid);
        });

        pool.getPool().query("INSERT INTO users (user_id, user_token, user_tokensecret, activate_email) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE SET user_token = $2, user_tokensecret = $2 RETURNING id", [user.userId, user.userToken, user.userTokenSecret, true], (err, result) =>  {
            if (err) {
                client.error = true;
                delete req.session.uuid;
                res.send("<script>window.close();</script>");
            } else {
                client.login = true;
                client.id = result.rows[0].id;

                delete req.session.uuid;

                res.send("<script>window.close();</script>");
            }
        });
    });
});

// return login successful or not
router.get('/oauth', (req, res) => {

    let client = clients.find((elem) => {
        return (elem.uuid === req.query.uuid);
    });

    waitUntil(500, Infinity, () => {
        if (client.error)
            return 2;
        else if (client.login)
            return true;
        return false;
    }, (result) => {
        if (result === true) {
            const token = JWTService.generateAccessToken({user_id: client.id})
            clients.splice(clients.indexOf(client), 1);
            res.status(200)
            res.json({JWTToken: token})
        } else {
            res.json({code: 401});
        }
    });
});

module.exports = router;