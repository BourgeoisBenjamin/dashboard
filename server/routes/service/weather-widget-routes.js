const router = require('express').Router();
const pool = require('../../services/postgresql');
const findPosition = require('../../utils/findPosition');
const JWTService = require("../../services/JWTToken");
const axios = require('axios');

router.delete('/weather/city-meteo/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM city_meteo_weather WHERE id = $1 AND id_weather_service IN (SELECT id FROM weather_service WHERE id_user = $2) RETURNING *", [req.params.id_widget, req.user.user_id], (err, result) => {
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

router.put('/weather/city-meteo/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("UPDATE city_meteo_weather SET activate = $3, city = $4, celsius = $5 WHERE id = $1 AND id_weather_service IN (SELECT id FROM weather_service WHERE id_user = $2) RETURNING id", [req.params.id_widget, req.user.user_id, req.body.activated, req.body.city, req.body.celsius], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
                return;
            }
            res.sendStatus(200);
        }
    })
})

router.get('/weather/city-meteo/:id_widget', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT w.city, w.celsius, s.api_key FROM city_meteo_weather w INNER JOIN weather_service s ON w.id_weather_service = s.id WHERE w.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"})
                return;
            }
            widgetInfos = result.rows[0];
            let unit;
            if (widgetInfos.celsius)
                unit = 'metric'
            else
                unit = 'imperial'

            axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + widgetInfos.city + '&units=' + unit + '&appid=' + widgetInfos.api_key)
            .then(function (response) {
                const data = response.data
                let rain = 0

                if (data.precipitation) {
                    rain = data.precipitation.value
                }
                const responseData = {temp: data.main.temp, humidity: data.main.humidity, pressure: data.main.pressure, description: data.weather[0].description, rain:rain, weathercode: data.weather[0].id}
                res.status(200)
                res.json(responseData)
            })
            .catch(function (error) {
                res.status(503)
                res.json({message: "Service Unavailable with this configuration"})
            })
        }
    })
})

router.post('/weather/city-meteo/', JWTService.authenticateToken, function (req, res) {

    findPosition.findPosition(req, (position) => {
        pool.getPool().query("INSERT INTO city_meteo_weather (id_weather_service, activate, city, celsius, position_x, position_y) VALUES ((SELECT id FROM weather_service WHERE id_user = $1), $2, $3, $4, $5, $6) RETURNING id", [req.user.user_id, req.body.activated, req.body.city, req.body.celsius, position.x, position.y], (err, result) => {
            if (err) {
                res.status(503);
                res.json({message: "Service Unavailable"});
            } else {
                if (!result.rows.length) {
                    res.status(401);
                    res.json({message: "Unauthorized"});
                    return;
                }
                res.status(200);
                res.json({id: result.rows[0].id});
            }
        })
    });
})

router.get('/weather/city-meteo/:id_widget/params', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT w.city, w.celsius, w.activate FROM city_meteo_weather w INNER JOIN weather_service s ON w.id_weather_service = s.id WHERE w.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                const infos = {activate: widgetInfos.activate, city: widgetInfos.city, celsius: widgetInfos.celsius}
                res.status(200)
                res.json(infos)
            }
        }
    })

})

module.exports = router;