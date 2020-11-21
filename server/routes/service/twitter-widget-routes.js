const JWTService = require("../../services/JWTToken");
const pool = require('../../services/postgresql');
const oauth = require('../../services/oauth');
const router = require('express').Router();

router.delete('/twitter/last-tweets/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM last_tweets_twitter WHERE id = $1 AND id_twitter_service IN (SELECT id FROM twitter_service WHERE id_user = $2)", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
})

router.put('/twitter/last-tweets/:id_widget', JWTService.authenticateToken, function (req, res) {

    if (req.query.number_tweets > 200) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of tweets : 200"});
        return;
    }

    pool.getPool().query("UPDATE last_tweets_twitter SET activate = $3, number_tweets = $4 WHERE id = $1 AND id_twitter_service IN (SELECT id FROM twitter_service WHERE id_user = $2)", [req.params.id_widget, req.user.user_id, req.query.activated, req.query.number_tweets], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
})

router.get('/twitter/last-tweets/:id_widget', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT l.number_tweets, s.token, s.tokensecret, s.twitter_id FROM last_tweets_twitter l INNER JOIN twitter_service s ON l.id_twitter_service = s.id WHERE l.id = $1", [req.params.id_widget], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            widgetInfos = result.rows[0];
            oauth.getOAuth().get(
                'https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=' + widgetInfos.twitter_id + '&count=' + widgetInfos.number_tweets,
                widgetInfos.token,
                widgetInfos.tokensecret, (e, data) => {
                    const tweets = JSON.parse(data);
                    res.status(200)
                    res.json(tweets)
                })
        }
    })

})

router.post('/twitter/last-tweets/', JWTService.authenticateToken, function (req, res) {

    if (req.query.number_tweets > 200) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of tweets : 200"});
        return;
    }

    pool.getPool().query("INSERT INTO last_tweets_twitter (id_twitter_service, activate, number_tweets) VALUES ((SELECT id FROM twitter_service WHERE id_user = $1), $2, $3) RETURNING id", [req.user.user_id, req.query.activated, req.query.number_tweets], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"});
        } else {
            res.status(200);
            res.json({id: result.rows[0].id});
        }
    })
})










router.delete('/covid/summary-country/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM summary_country_covid WHERE id = $1 AND id_covid_service IN (SELECT id FROM covid_service WHERE id_user = $2)", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
})

router.put('/covid/summary-country/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("UPDATE summary_country_covid SET activate = $3, country = $4 WHERE id = $1 AND id_covid_service IN (SELECT id FROM covid_service WHERE id_user = $2)", [req.params.id_widget, req.user.user_id, req.query.activated, req.query.country], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
})

router.get('/covid/summary-country/:id_widget', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT c.country FROM summary_country_covid c INNER JOIN covid_service s ON c.id_covid_service = s.id WHERE c.id = $1", [req.params.id_widget], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            widgetInfos = result.rows[0];
            axios.get('https://api.covid19api.com/summary')
                .then(function (response) {
                    const countrySummary = response.data.Countries.filter(function(item) {
                        console.debug(item)
                        return item.Country.toLowerCase() === widgetInfos.country.toLowerCase();
                    });
                    res.status(200)
                    res.json(countrySummary[0])
                })
                .catch(function (error) {
                    res.status(503)
                    res.json({message: "Service Unavailable"})
                })
        }
    })

})

router.post('/covid/summary-country/', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("INSERT INTO summary_country_covid (id_covid_service, activate, country) VALUES ((SELECT id FROM covid_service WHERE id_user = $1), $2, $3) RETURNING id", [req.user.user_id, req.query.activated, req.query.country], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"});
        } else {
            res.status(200);
            res.json({id: result.rows[0].id});
        }
    })
})

module.exports = router;