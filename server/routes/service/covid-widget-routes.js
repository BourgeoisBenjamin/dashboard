const findPosition = require('../../utils/findPosition');
const JWTService = require("../../services/JWTToken");
const pool = require('../../services/postgresql');
const router = require('express').Router();
const axios = require('axios');

router.delete('/covid/country-case/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM country_case_covid WHERE id = $1 AND id_covid_service IN (SELECT id FROM covid_service WHERE id_user = $2) RETURNING *", [req.params.id_widget, req.user.user_id], (err, result) => {
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

router.put('/covid/country-case/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("UPDATE country_case_covid SET activate = $3, country = $4 WHERE id = $1 AND id_covid_service IN (SELECT id FROM covid_service WHERE id_user = $2) RETURNING id", [req.params.id_widget, req.user.user_id, req.body.activated, req.body.country], (err, result) => {
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

router.get('/covid/country-case/:id_widget', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT c.country FROM country_case_covid c INNER JOIN covid_service s ON c.id_covid_service = s.id WHERE c.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
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
        }
    })
})

router.post('/covid/country-case/', JWTService.authenticateToken, function (req, res) {

    findPosition.findPosition(req, (position) => {
        pool.getPool().query("INSERT INTO country_case_covid (id_covid_service, activate, country, position_x, position_y) VALUES ((SELECT id FROM covid_service WHERE id_user = $1), $2, $3, $4, $5) RETURNING id", [req.user.user_id, req.body.activated, req.body.country, position.x, position.y], (err, result) => {
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
})

router.get('/covid/country-case/:id_widget/params', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT c.country, c.activate FROM country_case_covid c INNER JOIN covid_service s ON c.id_covid_service = s.id WHERE c.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401);
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                const infos = {activate: widgetInfos.activate, country: widgetInfos.country}
                res.status(200)
                res.json(infos)
            }
        }
    })
})



router.delete('/covid/summary-country/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM summary_country_covid WHERE id = $1 AND id_covid_service IN (SELECT id FROM covid_service WHERE id_user = $2) RETURNING *", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401);
                res.json({message: "Unauthorized"});
            } else {
                res.sendStatus(200);
            }
        }
    })
})

router.put('/covid/summary-country/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("UPDATE summary_country_covid SET activate = $3, country = $4 WHERE id = $1 AND id_covid_service IN (SELECT id FROM covid_service WHERE id_user = $2) RETURNING id", [req.params.id_widget, req.user.user_id, req.body.activated, req.body.country], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401);
                res.json({message: "Unauthorized"});
            } else {
                res.sendStatus(200);
            }
        }
    })
})

router.get('/covid/summary-country/:id_widget', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT c.country FROM summary_country_covid c INNER JOIN covid_service s ON c.id_covid_service = s.id WHERE c.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401);
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                axios.get('https://api.covid19api.com/summary')
                    .then(function (response) {
                        const countrySummary = response.data.Countries.filter(function (item) {
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
        }
    })

})

router.post('/covid/summary-country/', JWTService.authenticateToken, function (req, res) {
    findPosition.findPosition(req, (position) => {
        pool.getPool().query("INSERT INTO summary_country_covid (id_covid_service, activate, country, position_x, position_y) VALUES ((SELECT id FROM covid_service WHERE id_user = $1), $2, $3, $4, $5) RETURNING id", [req.user.user_id, req.body.activated, req.body.country, position.x, position.y], (err, result) => {
            if (err) {
                res.status(503);
                res.json({message: "Service Unavailable"});
            } else {
                if (!result.rows.length) {
                    res.status(401);
                    res.json({message: "Unauthorized"});
                } else {
                    res.status(200);
                    res.json({id: result.rows[0].id});
                }
            }
        })
    });
})

router.get('/covid/summary-country/:id_widget/params', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT c.country, c.activate FROM summary_country_covid c INNER JOIN covid_service s ON c.id_covid_service = s.id WHERE c.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401);
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                const infos = {activate: widgetInfos.activate, country: widgetInfos.country}
                res.status(200)
                res.json(infos)
            }
        }
    })

})

module.exports = router;