const JWTService = require("../../../../services/JWTToken")
const LoginWithTwitter = require('login-with-twitter')
const verifier = require('google-id-token-verifier')
const GoogleLogin = require('google-oauth-login')
const router = require('express').Router()
const waitUntil = require('wait-until')
const { v4: uuidv4 } = require('uuid')

const KEYS = require('../../../../config/keys')
const pool = require('../../../../services/postgresql')

const tw = new LoginWithTwitter({
    consumerKey: KEYS.TWITTER_APP.APP_API_KEY,
    consumerSecret: KEYS.TWITTER_APP.APP_API_KEY_SECRET,
    callbackUrl: KEYS.TWITTER_APP.APP_API_CALLBACK
})

const google = new GoogleLogin({
    clientId: KEYS.GOOGLE_APP.APP_API_KEY,
    clientSecret: KEYS.GOOGLE_APP.APP_API_KEY_SECRET,
    redirectUri: KEYS.GOOGLE_APP.APP_API_CALLBACK,
    scope: KEYS.GOOGLE_APP.APP_API_SCOPE,
    accessType: KEYS.GOOGLE_APP.APP_API_ACCESS_TYPE, // to get refresh token pass access type: offline
    prompt: KEYS.GOOGLE_APP.APP_API_PROMPT, // to prompt user everytime
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

// confirm oauth twitter
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

        pool.getPool().query("INSERT INTO users (tier_user_id, tier_username, tier_name) VALUES ($1, $2, $3) ON CONFLICT (tier_user_id) DO UPDATE SET tier_username = $2 RETURNING id", [user.userId, user.userName, 'twitter'], (err, result) =>  {
            if (err) {
                client.error = true;
            } else {
                client.login = true;
                client.id = result.rows[0].id;
            }
            delete req.session.uuid;
            res.send("<script>window.close();</script>");
        });
    });
});

// auth with google
router.get('/google', async (req, res) => {

    // generate the URL that Google will use for login and consent dialog
    const result = await google.getGoogleOauthUrl();

    // save uuid
    req.session.uuid = req.query.uuid;

    // redirect the user to consent screen
    res.redirect(result)
})

// confirm google oauth
router.get('/google/redirect', async (req, res) => {
    const oAuthParam = {
        code: req.query.code,
        scope: req.query.scope,
    }
    const result = await google.getAccessTokenAsync(oAuthParam)

    verifier.verify(result.id_token, KEYS.GOOGLE_APP.APP_API_KEY, (err, tokenInfo) => {
        if (err) {
            let client = clients.find((elem) => {
                return (elem.uuid === req.session.uuid);
            });
            client.error = true;
            res.send("<script>window.close();</script>");
        } else {

            let client = clients.find((elem) => {
                return (elem.uuid === req.session.uuid);
            });

            pool.getPool().query("INSERT INTO users (tier_user_id, tier_username, tier_name) VALUES ($1, $2, $3) ON CONFLICT (tier_user_id) DO UPDATE SET tier_username = $2 RETURNING id", [tokenInfo.sub, tokenInfo.name, 'google'], (err, result) =>  {
                if (err) {
                    client.error = true;
                } else {
                    client.login = true;
                    client.id = result.rows[0].id;
                }
                delete req.session.uuid;
                res.send("<script>window.close();</script>");
            });
        }
    });
})

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