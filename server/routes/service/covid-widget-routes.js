const JWTService = require("../../services/JWTToken");
const pool = require('../../services/postgresql');
const router = require('express').Router();
const axios = require('axios');

router.delete('/covid/country-case/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM country_case_covid WHERE id = $1 AND id_covid_service IN (SELECT id FROM covid_service WHERE id_user = $2)", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
})

router.put('/covid/country-case/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("UPDATE country_case_covid SET activate = $3, country = $4 WHERE id = $1 AND id_covid_service IN (SELECT id FROM covid_service WHERE id_user = $2)", [req.params.id_widget, req.user.user_id, req.query.activated, req.query.country], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
})

router.get('/covid/country-case/:id_widget', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT c.country FROM country_case_covid c INNER JOIN covid_service s ON c.id_covid_service = s.id WHERE c.id = $1", [req.params.id_widget], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            widgetInfos = result.rows[0];
            axios.get('https://api.covid19api.com/total/country/' + widgetInfos.country)
            .then(function (response) {
                const data = response.data
                res.status(200)
                res.json(data[data.length - 1])
            })
            .catch(function (error) {
                res.status(503)
                res.json({message: "Service Unavailable with this configuration"})
            })
        }
    })

})

router.post('/covid/country-case/', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("INSERT INTO country_case_covid (id_covid_service, activate, country) VALUES ((SELECT id FROM covid_service WHERE id_user = $1), $2, $3) RETURNING id", [req.user.user_id, req.query.activated, req.query.country], (err, result) => {
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
    pool.getPool().query("INSERT INTO summary_country_covid (id_covid_service, activate, country) VALUES ((SELECT id FROM covid_service WHERE id_user = $1), $2, $3) RETURNING id", [req.user.user_id, req.body.activated, req.body.country], (err, result) => {
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