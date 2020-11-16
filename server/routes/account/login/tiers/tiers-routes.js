const router = require('express').Router();
const waitUntil = require('wait-until');
const { v4: uuidv4 } = require('uuid');
const LoginWithTwitter = require('login-with-twitter')
const URL = require('url');
const KEYS = require('../../../../config/keys');

const tw = new LoginWithTwitter({
    consumerKey: KEYS.TWITTER_APP.APP_API_KEY,
    consumerSecret: KEYS.TWITTER_APP.APP_API_KEY_SECRET,
    callbackUrl: KEYS.TWITTER_APP.APP_API_CALLBACK
})

let clients = Array();

// init connection return uuid
router.get('/init', (req, res) => {
})