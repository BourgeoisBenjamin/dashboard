const OAuth = require('oauth');
const KEYS = require("../config/keys");

let oauth;

module.exports = {
    getOAuth: function () {
        if (oauth) return oauth; // if it is already there, grab it here
        oauth = new OAuth.OAuth(
            'https://api.twitter.com/oauth/request_token',
            'https://api.twitter.com/oauth/access_token',
            KEYS.TWITTER_APP.APP_API_KEY,
            KEYS.TWITTER_APP.APP_API_KEY_SECRET,
            '1.0A',
            null,
            'HMAC-SHA1'
        );
        return oauth;
    },
};