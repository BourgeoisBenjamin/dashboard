const JWTService = require("../../services/JWTToken");
const pool = require('../../services/postgresql');
const oauth = require('../../services/oauth');
const router = require('express').Router();

router.delete('/twitter/last-tweets/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM last_tweets_twitter WHERE id = $1 AND id_twitter_service IN (SELECT id FROM twitter_service WHERE id_user = $2) RETURNING *", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                res.sendStatus(200);
            }
        }
    })
})

router.put('/twitter/last-tweets/:id_widget', JWTService.authenticateToken, function (req, res) {

    if (req.query.number_tweets > 200) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of tweets : 200"});
        return;
    }

    pool.getPool().query("UPDATE last_tweets_twitter SET activate = $3, number_tweets = $4 WHERE id = $1 AND id_twitter_service IN (SELECT id FROM twitter_service WHERE id_user = $2) RETURNING id", [req.params.id_widget, req.user.user_id, req.body.activated, req.body.number_tweets], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                res.sendStatus(200);
            }
        }
    })
})

router.get('/twitter/last-tweets/:id_widget', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT l.number_tweets, s.token, s.tokensecret, s.twitter_id, s.activate FROM last_tweets_twitter l INNER JOIN twitter_service s ON l.id_twitter_service = s.id WHERE l.id = $1  AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];

                if (!widgetInfos.activate) {
                    res.sendStatus(418);
                    return;
                }

                oauth.getOAuth().get(
                    'https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=' + widgetInfos.twitter_id + '&count=' + widgetInfos.number_tweets,
                    widgetInfos.token,
                    widgetInfos.tokensecret, (e, data) => {
                        const tweets = JSON.parse(data);
                        res.status(200)
                        res.json(tweets)
                    })
            }
        }
    })
})

router.post('/twitter/last-tweets/', JWTService.authenticateToken, function (req, res) {

    if (req.body.number_tweets > 200) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of tweets : 200"});
        return;
    }

    pool.getPool().query("INSERT INTO last_tweets_twitter (id_twitter_service, activate, number_tweets) VALUES ((SELECT id FROM twitter_service WHERE id_user = $1), $2, $3) RETURNING id", [req.user.user_id, req.body.activated, req.body.number_tweets], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"});
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                res.status(200);
                res.json({id: result.rows[0].id});
            }
        }
    })
})

router.get('/twitter/last-tweets/:id_widget/params', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT l.number_tweets, l.activate FROM last_tweets_twitter l INNER JOIN twitter_service s ON l.id_twitter_service = s.id WHERE l.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                const infos = {activate: widgetInfos.activate, number_tweets: widgetInfos.number_tweets}
                res.status(200)
                res.json(infos)
            }
        }
    })
})

router.delete('/twitter/search-tweets/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM search_tweets_twitter WHERE id = $1 AND id_twitter_service IN (SELECT id FROM twitter_service WHERE id_user = $2) RETURNING *", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                res.sendStatus(200);
            }
        }
    })
})

router.put('/twitter/search-tweets/:id_widget', JWTService.authenticateToken, function (req, res) {

    if (req.body.number_tweets > 100) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of tweets : 100"});
        return;
    }

    pool.getPool().query("UPDATE search_tweets_twitter SET activate = $3, search = $5, number_tweets = $4 WHERE id = $1 AND id_twitter_service IN (SELECT id FROM twitter_service WHERE id_user = $2) RETURNING id", [req.params.id_widget, req.user.user_id, req.body.activated, req.body.number_tweets, req.body.search], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                res.sendStatus(200);
            }
        }
    })
})

router.get('/twitter/search-tweets/:id_widget', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT l.number_tweets, l.search, s.token, s.tokensecret, s.twitter_id, s.activate FROM search_tweets_twitter l INNER JOIN twitter_service s ON l.id_twitter_service = s.id WHERE l.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];

                if (!widgetInfos.activate) {
                    res.sendStatus(418);
                    return;
                }

                oauth.getOAuth().get(
                    'https://api.twitter.com/1.1/search/tweets.json?q=' + widgetInfos.search + '&count=' + widgetInfos.number_tweets,
                    widgetInfos.token,
                    widgetInfos.tokensecret, (e, data) => {
                        const tweets = JSON.parse(data);
                        res.status(200)
                        res.json(tweets.statuses)
                    })
            }
        }
    })
})

router.post('/twitter/search-tweets/', JWTService.authenticateToken, function (req, res) {

    if (req.query.number_tweets > 100) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of tweets : 100"});
        return;
    }

    pool.getPool().query("INSERT INTO search_tweets_twitter (id_twitter_service, activate, number_tweets, search) VALUES ((SELECT id FROM twitter_service WHERE id_user = $1), $2, $3, $4) RETURNING id", [req.user.user_id, req.body.activated, req.body.number_tweets, req.body.search], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"});
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                res.status(200);
                res.json({id: result.rows[0].id});
            }
        }
    })
})

router.get('/twitter/search-tweets/:id_widget/params', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT l.number_tweets, l.search, l.activate FROM search_tweets_twitter l INNER JOIN twitter_service s ON l.id_twitter_service = s.id WHERE l.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                const infos = {activate: widgetInfos.activate, search: widgetInfos.search, number_tweets: widgetInfos.number_tweets}
                res.status(200)
                res.json(infos)
            }
        }
    })
})

module.exports = router;