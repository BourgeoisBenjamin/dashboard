const SpotifyWebApi = require('spotify-web-api-node');
const JWTService = require("../../services/JWTToken");
const pool = require('../../services/postgresql');
const oauth = require('../../services/oauth');
const KEYS = require("../../config/keys");
const router = require('express').Router();

const spotifyApi = new SpotifyWebApi({
    clientId: KEYS.SPOTIFY.CLIENT_ID,
    clientSecret: KEYS.SPOTIFY.CLIENT_SECRET,
    redirectUri: KEYS.SPOTIFY.REDIRECT_URL
});

router.delete('/spotify/top-tracks-user/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM top_tracks_user_spotify WHERE id = $1 AND id_spotify_service IN (SELECT id FROM spotify_service WHERE id_user = $2) RETURNING *", [req.params.id_widget, req.user.user_id], (err, result) => {
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

router.put('/spotify/top-tracks-user/:id_widget', JWTService.authenticateToken, function (req, res) {

    if (req.body.limit_tracks > 50) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of tracks : 50"});
        return;
    }

    pool.getPool().query("UPDATE top_tracks_user_spotify SET activate = $3, limit_tracks = $4, time_range = $5 WHERE id = $1 AND id_spotify_service IN (SELECT id FROM spotify_service WHERE id_user = $2) RETURNING id", [req.params.id_widget, req.user.user_id, req.body.activated, req.body.limit_tracks, req.body.time_range], (err, result) => {
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

router.get('/spotify/top-tracks-user/:id_widget', JWTService.authenticateToken, async function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT w.limit_tracks, w.time_range, s.access_token, s.refresh_token, s.expires_in, s.activate FROM top_tracks_user_spotify w INNER JOIN spotify_service s ON w.id_spotify_service = s.id WHERE w.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                const params = {limit: widgetInfos.limit_tracks, time_range: widgetInfos.time_range}

                if (!widgetInfos.activate) {
                    res.sendStatus(418);
                    return;
                }

                spotifyApi.setAccessToken(widgetInfos.access_token)
                spotifyApi.setRefreshToken(widgetInfos.refresh_token)

                const t = new Date()
                if (t > widgetInfos.expires_in) {
                    spotifyApi.refreshAccessToken().then(async (data) => {

                        const new_t = new Date();
                        new_t.setSeconds(new_t.getSeconds() + data.body['expires_in']);

                        await pool.getPool().query("UPDATE spotify_service SET access_token = $2, expires_in = $3 WHERE id_user = $1", [req.user.user_id, data.body['access_token'], new_t], (err, result) => {
                            if (err) {
                                res.status(418)
                                res.json({message: "Service Unavailable"});
                                return;
                            } else {
                                widgetInfos.access_token = data.body['access_token']
                                spotifyApi.setAccessToken(widgetInfos.access_token)
                            }
                        });
                        }, (err) => {
                            res.status(418)
                            res.json({message: "Service Unavailable"});
                            return;
                        }
                    );
                }
                spotifyApi.getMyTopTracks(params).then(function (data) {
                    const topTracks = data.body.items;
                    spotifyApi.resetAccessToken()
                    spotifyApi.resetRefreshToken()
                    res.status(200);
                    res.json(topTracks)
                }, function (err) {
                    spotifyApi.resetAccessToken()
                    spotifyApi.resetRefreshToken()
                    res.status(503)
                    res.json({message: "Service Unavailable"});
                });
            }
        }
    })
})

router.post('/spotify/top-tracks-user/', JWTService.authenticateToken, function (req, res) {

    if (req.body.limit_tracks > 50) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of tracks : 50"});
        return;
    }

    pool.getPool().query("INSERT INTO top_tracks_user_spotify (id_spotify_service, activate, limit_tracks, time_range) VALUES ((SELECT id FROM spotify_service WHERE id_user = $1), $2, $3, $4) RETURNING id", [req.user.user_id, req.body.activated, req.body.limit_tracks, req.body.time_range], (err, result) => {
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

router.get('/spotify/top-tracks-user/:id_widget/params', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT w.activate, w.limit_tracks, w.time_range FROM top_tracks_user_spotify w INNER JOIN spotify_service s ON w.id_spotify_service = s.id WHERE w.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                const infos = {
                    activate: widgetInfos.activate,
                    limit_tracks: widgetInfos.limit_tracks,
                    time_range: widgetInfos.time_range
                }
                res.status(200)
                res.json(infos)
            }
        }
    })
})

router.delete('/spotify/top-artists-user/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM top_artists_user_spotify WHERE id = $1 AND id_spotify_service IN (SELECT id FROM spotify_service WHERE id_user = $2) RETURNING *", [req.params.id_widget, req.user.user_id], (err, result) => {
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

router.put('/spotify/top-artists-user/:id_widget', JWTService.authenticateToken, function (req, res) {

    if (req.body.limit_artists > 50) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of artists : 50"});
        return;
    }

    pool.getPool().query("UPDATE top_artists_user_spotify SET activate = $3, limit_artists = $4, time_range = $5 WHERE id = $1 AND id_spotify_service IN (SELECT id FROM spotify_service WHERE id_user = $2) RETURNING id", [req.params.id_widget, req.user.user_id, req.body.activated, req.body.limit_artists, req.body.time_range], (err, result) => {
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

router.get('/spotify/top-artists-user/:id_widget', JWTService.authenticateToken, async function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT w.limit_artists, w.time_range, s.access_token, s.refresh_token, s.expires_in, s.activate FROM top_artists_user_spotify w INNER JOIN spotify_service s ON w.id_spotify_service = s.id WHERE w.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {

                widgetInfos = result.rows[0];
                const params = {limit: widgetInfos.limit_artists, time_range: widgetInfos.time_range}

                if (!widgetInfos.activate) {
                    res.sendStatus(418);
                    return;
                }

                spotifyApi.setAccessToken(widgetInfos.access_token)
                spotifyApi.setRefreshToken(widgetInfos.refresh_token)

                const t = new Date()
                if (t > widgetInfos.expires_in) {
                    spotifyApi.refreshAccessToken().then(async (data) => {

                            const new_t = new Date();
                            new_t.setSeconds(new_t.getSeconds() + data.body['expires_in']);

                            await pool.getPool().query("UPDATE spotify_service SET access_token = $2, expires_in = $3 WHERE id_user = $1", [req.user.user_id, data.body['access_token'], new_t], (err, result) => {
                                if (err) {
                                    res.status(418)
                                    res.json({message: "Service Unavailable"});
                                    return;
                                } else {
                                    widgetInfos.access_token = data.body['access_token']
                                    spotifyApi.setAccessToken(widgetInfos.access_token)
                                }
                            });
                        }, (err) => {
                            res.status(418)
                            res.json({message: "Service Unavailable"});
                            return;
                        }
                    );
                }

                spotifyApi.getMyTopArtists(params)
                .then(function (data) {
                    const topArtists = data.body.items;
                    spotifyApi.resetAccessToken()
                    spotifyApi.resetRefreshToken()
                    res.status(200);
                    res.json(topArtists)
                }, function (err) {
                    spotifyApi.resetAccessToken()
                    spotifyApi.resetRefreshToken()
                    res.status(503)
                    res.json({message: "Service Unavailable"});
                });
            }
        }
    })
})

router.post('/spotify/top-artists-user/', JWTService.authenticateToken, function (req, res) {

    if (req.body.limit_artists > 50) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of artists : 50"});
        return;
    }

    pool.getPool().query("INSERT INTO top_artists_user_spotify (id_spotify_service, activate, limit_artists, time_range) VALUES ((SELECT id FROM spotify_service WHERE id_user = $1), $2, $3, $4) RETURNING id", [req.user.user_id, req.body.activated, req.body.limit_artists, req.body.time_range], (err, result) => {
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

router.get('/spotify/top-artists-user/:id_widget/params', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT w.activate, w.limit_artists, w.time_range FROM top_artists_user_spotify w INNER JOIN spotify_service s ON w.id_spotify_service = s.id WHERE w.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                const infos = {
                    activate: widgetInfos.activate,
                    limit_artists: widgetInfos.limit_artists,
                    time_range: widgetInfos.time_range
                }
                res.status(200)
                res.json(infos)
            }
        }
    })
})

router.delete('/spotify/recently-played-tracks-user/:id_widget', JWTService.authenticateToken, function (req, res) {
    pool.getPool().query("DELETE FROM recently_played_tracks_user_spotify WHERE id = $1 AND id_spotify_service IN (SELECT id FROM spotify_service WHERE id_user = $2) RETURNING *", [req.params.id_widget, req.user.user_id], (err, result) => {
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

router.put('/spotify/recently-played-tracks-user/:id_widget', JWTService.authenticateToken, function (req, res) {

    if (req.body.limit_tracks > 50) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of tracks : 50"});
        return;
    }

    pool.getPool().query("UPDATE recently_played_tracks_user_spotify SET activate = $3, limit_tracks = $4 WHERE id = $1 AND id_spotify_service IN (SELECT id FROM spotify_service WHERE id_user = $2) RETURNING id", [req.params.id_widget, req.user.user_id, req.body.activated, req.body.limit_tracks], (err, result) => {
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

router.get('/spotify/recently-played-tracks-user/:id_widget', JWTService.authenticateToken, async function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT w.limit_tracks, s.access_token, s.refresh_token, s.expires_in, s.activate FROM recently_played_tracks_user_spotify w INNER JOIN spotify_service s ON w.id_spotify_service = s.id WHERE w.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                const params = {limit: widgetInfos.limit_tracks}

                if (!widgetInfos.activate) {
                    res.sendStatus(418);
                    return;
                }

                spotifyApi.setAccessToken(widgetInfos.access_token)
                spotifyApi.setRefreshToken(widgetInfos.refresh_token)

                const t = new Date()
                if (t > widgetInfos.expires_in) {
                    spotifyApi.refreshAccessToken().then(async (data) => {

                            const new_t = new Date();
                            new_t.setSeconds(new_t.getSeconds() + data.body['expires_in']);

                            await pool.getPool().query("UPDATE spotify_service SET access_token = $2, expires_in = $3 WHERE id_user = $1", [req.user.user_id, data.body['access_token'], new_t], (err, result) => {
                                if (err) {
                                    res.status(418)
                                    res.json({message: "Service Unavailable"});
                                    return;
                                } else {
                                    widgetInfos.access_token = data.body['access_token']
                                    spotifyApi.setAccessToken(widgetInfos.access_token)
                                }
                            });
                        }, (err) => {
                            res.status(418)
                            res.json({message: "Service Unavailable"});
                            return;
                        }
                    );
                }

                spotifyApi.getMyRecentlyPlayedTracks(params)
                .then(function (data) {
                    const recentlyPlayedTracks = data.body.items;
                    spotifyApi.resetAccessToken()
                    spotifyApi.resetRefreshToken()
                    res.status(200);
                    res.json(recentlyPlayedTracks)
                }, function (err) {
                    spotifyApi.resetAccessToken()
                    spotifyApi.resetRefreshToken()
                    res.status(503)
                    res.json({message: "Service Unavailable"});
                });
            }
        }
    })
})

router.post('/spotify/recently-played-tracks-user/', JWTService.authenticateToken, function (req, res) {

    if (req.body.limit_tracks > 50) {
        res.status(503);
        res.json({message: "Invalid configuration. Max number of tracks : 50"});
        return;
    }

    pool.getPool().query("INSERT INTO recently_played_tracks_user_spotify (id_spotify_service, activate, limit_tracks) VALUES ((SELECT id FROM spotify_service WHERE id_user = $1), $2, $3) RETURNING id", [req.user.user_id, req.body.activated, req.body.limit_tracks], (err, result) => {
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

router.get('/spotify/recently-played-tracks-user/:id_widget/params', JWTService.authenticateToken, function (req, res) {

    let widgetInfos;

    pool.getPool().query("SELECT w.activate, w.limit_tracks FROM recently_played_tracks_user_spotify w INNER JOIN spotify_service s ON w.id_spotify_service = s.id WHERE w.id = $1 AND s.id_user = $2", [req.params.id_widget, req.user.user_id], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"})
        } else {
            if (!result.rows.length) {
                res.status(401)
                res.json({message: "Unauthorized"});
            } else {
                widgetInfos = result.rows[0];
                const infos = {activate: widgetInfos.activate, limit_tracks: widgetInfos.limit_tracks}
                res.status(200)
                res.json(infos)
            }
        }
    })
})

module.exports = router;