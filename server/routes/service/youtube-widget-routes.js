const JWTService = require("../../services/JWTToken");
const pool = require('../../services/postgresql');
const findPosition = require('../../utils/findPosition');
const router = require('express').Router();
const KEYS = require("../../config/keys");
const axios = require('axios');

router.delete('/youtube/statistics-channel/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM statistics_channel_youtube WHERE id = $1 AND id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $2) RETURNING *", [req.params.id_widget, req.user.user_id], (err, result) => {
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

router.put('/youtube/statistics-channel/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("UPDATE statistics_channel_youtube SET activate = $3, id_channel = $4 WHERE id = $1 AND id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $2) RETURNING id", [req.params.id_widget, req.user.user_id, req.body.activated, req.body.id_channel], (err, result) => {
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

router.get('/youtube/statistics-channel/:id_widget', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT y.id_channel, s.access_token FROM statistics_channel_youtube y INNER JOIN youtube_service s ON y.id_youtube_service = s.id WHERE y.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
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
        }
    })
})

router.post('/youtube/statistics-channel/', JWTService.authenticateToken, function (req, res) {

    findPosition.findPosition(req, (position) => {
        pool.getPool().query("INSERT INTO statistics_channel_youtube (id_youtube_service, activate, id_channel, position_x, position_y) VALUES ((SELECT id FROM youtube_service WHERE id_user = $1), $2, $3, $4, $5) RETURNING id", [req.user.user_id, req.body.activated, req.body.id_channel, position.x, position.y], (err, result) => {
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
    });
})

router.get('/youtube/statistics-channel/:id_widget/params', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT y.id_channel, y.activate FROM statistics_channel_youtube y INNER JOIN youtube_service s ON y.id_youtube_service = s.id WHERE y.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                const infos = {activate: widgetInfos.activate, id_channel: widgetInfos.id_channel}
                res.status(200)
                res.json(infos)
            }
        }
    })
})

router.delete('/youtube/statistics-video/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM statistics_video_youtube WHERE id = $1 AND id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $2) RETURNING *", [req.params.id_widget, req.user.user_id], (err, result) => {
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

router.put('/youtube/statistics-video/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("UPDATE statistics_video_youtube SET activate = $3, id_video = $4 WHERE id = $1 AND id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $2) RETURNING id", [req.params.id_widget, req.user.user_id, req.body.activated, req.body.id_video], (err, result) => {
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

router.get('/youtube/statistics-video/:id_widget', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT y.id_video, s.access_token FROM statistics_video_youtube y INNER JOIN youtube_service s ON y.id_youtube_service = s.id WHERE y.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
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
        }
    })
})

router.post('/youtube/statistics-video/', JWTService.authenticateToken, function (req, res) {

    findPosition.findPosition(req, (position) => {
        pool.getPool().query("INSERT INTO statistics_video_youtube (id_youtube_service, activate, id_video, position_x, position_y) VALUES ((SELECT id FROM youtube_service WHERE id_user = $1), $2, $3, $4, $5) RETURNING id", [req.user.user_id, req.body.activated, req.body.id_video, position.x, position.y], (err, result) => {
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
    });
})

router.get('/youtube/statistics-video/:id_widget/params', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT y.id_video, y.activate FROM statistics_video_youtube y INNER JOIN youtube_service s ON y.id_youtube_service = s.id WHERE y.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                const infos = {activate: widgetInfos.activate, id_video: widgetInfos.id_video}
                res.status(200)
                res.json(infos)
            }
        }
    })
})

router.delete('/youtube/comments-video/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM comments_video_youtube WHERE id = $1 AND id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $2) RETURNING *", [req.params.id_widget, req.user.user_id], (err, result) => {
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

router.put('/youtube/comments-video/:id_widget', JWTService.authenticateToken, function (req, res) {

    if (req.query.number_comments > 100) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of comments : 100"});
        return;
    }

    pool.getPool().query("UPDATE comments_video_youtube SET activate = $3, number_comments = $4, id_video = $5 WHERE id = $1 AND id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $2) RETURNING id", [req.params.id_widget, req.user.user_id, req.body.activated, req.body.number_comments, req.body.id_video], (err, result) => {
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

router.get('/youtube/comments-video/:id_widget', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT y.id_video, y.number_comments, s.access_token FROM comments_video_youtube y INNER JOIN youtube_service s ON y.id_youtube_service = s.id WHERE y.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                axios.get('https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&order=time&maxResults=' + widgetInfos.number_comments + '&videoId=' + widgetInfos.id_video + '&key=' + KEYS.YOUTUBE_APP.APP_API_KEY)
                    .then(function (response) {
                        if (!response.data.items.length) {
                            res.status(200)
                            res.json({})
                        } else {
                            const videoStatistics = response.data.items
                            res.status(200)
                            res.json(videoStatistics)
                        }
                    })
                    .catch(function (error) {
                        res.status(503)
                        res.json({message: "Service Unavailable"})
                    })
            }
        }
    })
})

router.post('/youtube/comments-video/', JWTService.authenticateToken, function (req, res) {

    if (req.body.number_comments > 100) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of comments : 100"});
        return;
    }

    findPosition.findPosition(req, (position) => {
        pool.getPool().query("INSERT INTO comments_video_youtube (id_youtube_service, activate, number_comments, id_video, position_x, position_y) VALUES ((SELECT id FROM youtube_service WHERE id_user = $1), $2, $3, $4, $5, $6) RETURNING id", [req.user.user_id, req.body.activated, req.body.number_comments, req.body.id_video, position.x, position.y], (err, result) => {
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
    });
})

router.get('/youtube/comments-video/:id_widget/params', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT y.id_video, y.activate, y.number_comments FROM comments_video_youtube y INNER JOIN youtube_service s ON y.id_youtube_service = s.id WHERE y.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                const infos = {activate: widgetInfos.activate, number_comments: widgetInfos.number_comments, id_video: widgetInfos.id_video}
                res.status(200)
                res.json(infos)
            }
        }
    })
})

router.delete('/youtube/channel-videos/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM channel_videos_youtube WHERE id = $1 AND id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $2) RETURNING *", [req.params.id_widget, req.user.user_id], (err, result) => {
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

router.put('/youtube/channel-videos/:id_widget', JWTService.authenticateToken, function (req, res) {

    if (req.query.number_videos > 50) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of videos : 50"});
        return;
    }

    pool.getPool().query("UPDATE channel_videos_youtube SET activate = $3, id_channel = $4, number_videos = $5 WHERE id = $1 AND id_youtube_service IN (SELECT id FROM youtube_service WHERE id_user = $2) RETURNING id", [req.params.id_widget, req.user.user_id, req.body.activated, req.body.id_channel, req.body.number_videos], (err, result) => {
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

router.get('/youtube/channel-videos/:id_widget', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT y.id_channel, y.number_videos, s.access_token FROM channel_videos_youtube y INNER JOIN youtube_service s ON y.id_youtube_service = s.id WHERE y.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                console.log(widgetInfos);
                axios.get('https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=date&channelId=' + widgetInfos.id_channel + '&maxResults=' + widgetInfos.number_videos + '&key=' + KEYS.YOUTUBE_APP.APP_API_KEY)
                    .then(function (response) {
                        if (!response.data.items.length) {
                            res.status(200)
                            res.json({})
                        } else {
                            const videosChannel = response.data.items
                            res.status(200)
                            res.json(videosChannel)
                        }
                    })
                    .catch(function (error) {
                        console.log("oh shit");
                        res.status(503)
                        res.json({message: "Service Unavailable"})
                    })
            }
        }
    })
})

router.post('/youtube/channel-videos/', JWTService.authenticateToken, function (req, res) {

    if (req.query.number_videos > 50) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of videos : 50"});
        return;
    }

    findPosition.findPosition(req, (position) => {
        pool.getPool().query("INSERT INTO channel_videos_youtube (id_youtube_service, activate, id_channel, number_videos, position_x, position_y) VALUES ((SELECT id FROM youtube_service WHERE id_user = $1), $2, $3, $4, $5, $6) RETURNING id", [req.user.user_id, req.body.activated, req.body.id_channel, req.body.number_videos, position.x, position.y], (err, result) => {
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
    });
})

router.get('/youtube/channel-videos/:id_widget/params', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT y.id_channel, y.activate, y.number_videos FROM channel_videos_youtube y INNER JOIN youtube_service s ON y.id_youtube_service = s.id WHERE y.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                const infos = {activate: widgetInfos.activate, id_channel: widgetInfos.id_channel, number_videos: widgetInfos.number_videos}
                res.status(200)
                res.json(infos)
            }
        }
    })
})

module.exports = router;