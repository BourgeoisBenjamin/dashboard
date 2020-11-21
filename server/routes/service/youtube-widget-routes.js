const JWTService = require("../../services/JWTToken");
const pool = require('../../services/postgresql');
const router = require('express').Router();
const KEYS = require("../../config/keys");
const axios = require('axios');

router.delete('/youtube/statistics-channel/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM statistics_channel_youtube WHERE id = $1 AND id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $2)", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
})

router.put('/youtube/statistics-channel/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("UPDATE statistics_channel_youtube SET activate = $3, id_channel = $4 WHERE id = $1 AND id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $2)", [req.params.id_widget, req.user.user_id, req.query.activated, req.query.channel_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
})

router.get('/youtube/statistics-channel/:id_widget', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT y.id_channel, s.access_token FROM statistics_channel_youtube y INNER JOIN youtube_service s ON y.id_youtube_service = s.id WHERE y.id = $1", [req.params.id_widget], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            widgetInfos = result.rows[0];
            axios.get('https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=' + widgetInfos.id_channel + '&key=' + KEYS.YOUTUBE_APP.APP_API_KEY)
                .then(function (response) {
                    if (!response.data.items.length) {
                        res.status(200)
                        res.json({})
                    } else {
                        const channelStatistics = response.data.items[0]
                        res.status(200)
                        res.json(channelStatistics)
                    }
                })
                .catch(function (error) {
                    res.status(503)
                    res.json({message: "Service Unavailable"})
                })
        }
    })

})

router.post('/youtube/statistics-channel/', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("INSERT INTO statistics_channel_youtube (id_youtube_service, activate, id_channel) VALUES ((SELECT id FROM youtube_service WHERE id_user = $1), $2, $3) RETURNING id", [req.user.user_id, req.query.activated, req.query.channel_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"});
        } else {
            res.status(200);
            res.json({id: result.rows[0].id});
        }
    })
})

router.delete('/youtube/statistics-video/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM statistics_video_youtube WHERE id = $1 AND id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $2)", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
})

router.put('/youtube/statistics-video/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("UPDATE statistics_video_youtube SET activate = $3, id_video = $4 WHERE id = $1 AND id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $2)", [req.params.id_widget, req.user.user_id, req.query.activated, req.query.video_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            res.status(200);
        }
    })
})

router.get('/youtube/statistics-video/:id_widget', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT y.id_video, s.access_token FROM statistics_video_youtube y INNER JOIN youtube_service s ON y.id_youtube_service = s.id WHERE y.id = $1", [req.params.id_widget], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            widgetInfos = result.rows[0];
            axios.get('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=' + widgetInfos.id_video + '&key=' + KEYS.YOUTUBE_APP.APP_API_KEY)
                .then(function (response) {
                    if (!response.data.items.length) {
                        res.status(200)
                        res.json({})
                    } else {
                        const videoStatistics = response.data.items[0]
                        res.status(200)
                        res.json(videoStatistics)
                    }
                })
                .catch(function (error) {
                    res.status(503)
                    res.json({message: "Service Unavailable"})
                })
        }
    })

})

router.post('/youtube/statistics-video/', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("INSERT INTO statistics_video_youtube (id_youtube_service, activate, id_video) VALUES ((SELECT id FROM youtube_service WHERE id_user = $1), $2, $3) RETURNING id", [req.user.user_id, req.query.activated, req.query.video_id], (err, result) => {
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