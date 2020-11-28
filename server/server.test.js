const port = process.env.SERVER_PORT
const express = require('express');
const app = express();

const session = require("express-session");
const pgSession = require('connect-pg-simple')(session);
const bodyParser = require('body-parser')
const cors = require("cors");
const pg = require('pg');
const ms = require('ms');

const pool = require('./services/postgresql')
const KEYS = require("./config/keys");

const aboutRoutes = require("./routes/about");
const accountRoutes = require("./routes/account/account-routes");
const accountPasswordRoutes = require("./routes/account/password/account-password-routes");
const weatherWidgetRoutes = require('./routes/service/weather-widget-routes')
const covidWidgetRoutes = require('./routes/service/covid-widget-routes')
const twitterWidgetRoutes = require('./routes/service/twitter-widget-routes')
const spotifyWidgetRoutes = require('./routes/service/spotify-widget-routes')
const JWTService = require("./services/JWTToken");
const youtubeWidgetRoutes = require('./routes/service/youtube-widget-routes');

app.use(bodyParser());

const sessionConfig = {
    name: 'dashboard',
    secret: KEYS.SESSION.SESSION_KEY,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    store: new pgSession({
        pool : pool.getPool(),
        tableName : KEYS.SESSION.TABLE_NAME
    }),
    resave: false,
    saveUninitialized: false,
    tokenSecret: null,
}

app.use(session(sessionConfig))

// set up cors to allow us to accept requests from our client
app.use(
    cors({
        origin: '*', // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    })
);

// set up routes
app.use("/", aboutRoutes);
app.use("/account", accountRoutes);
app.use("/account/password", accountPasswordRoutes);
app.use("/service", weatherWidgetRoutes);
app.use("/service", covidWidgetRoutes);
app.use("/service", twitterWidgetRoutes);
app.use("/service", spotifyWidgetRoutes);
app.use("/service", youtubeWidgetRoutes);

app.get('/', (req, res) => {
    res.json({message: 'Hello world !!'});
});

const request = `
    SELECT id, 'City meteo weather' AS NAME, position_x, position_y FROM city_meteo_weather WHERE activate=true AND id_weather_service=(SELECT id FROM weather_service WHERE id_user = $1) UNION
    SELECT id, 'Country case covid' AS NAME, position_x, position_y FROM country_case_covid WHERE activate=true AND id_covid_service=(SELECT id FROM covid_service WHERE id_user = $1) UNION
    SELECT id, 'Summary country covid' AS NAME, position_x, position_y FROM summary_country_covid WHERE activate=true AND id_covid_service=(SELECT id FROM covid_service WHERE id_user = $1) UNION
    SELECT id, 'Search tweets twitter' AS NAME, position_x, position_y FROM search_tweets_twitter WHERE activate=true AND id_twitter_service=(SELECT id FROM twitter_service WHERE id_user = $1) UNION
    SELECT id, 'Last tweets twitter' AS NAME, position_x, position_y FROM last_tweets_twitter WHERE activate=true AND id_twitter_service=(SELECT id FROM twitter_service WHERE id_user = $1) UNION
    SELECT id, 'Channels videos youtube' AS NAME, position_x, position_y FROM channel_videos_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user = $1) UNION
    SELECT id, 'Comments video youtube' AS NAME, position_x, position_y FROM comments_video_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user = $1) UNION
    SELECT id, 'Statistics video youtube' AS NAME, position_x, position_y FROM statistics_video_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user = $1) UNION
    SELECT id, 'Statistics channel youtube' AS NAME, position_x, position_y FROM statistics_channel_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user = $1) UNION
    SELECT id, 'Top tracks user spotify' AS NAME, position_x, position_y FROM top_tracks_user_spotify WHERE activate=true AND id_spotify_service=(SELECT id FROM spotify_service WHERE id_user = $1) UNION
    SELECT id, 'Top artists user spotify' AS NAME, position_x, position_y FROM top_artists_user_spotify WHERE activate=true AND id_spotify_service=(SELECT id FROM spotify_service WHERE id_user = $1) UNION
    SELECT id, 'Recently played tracks user spotify' AS NAME, position_x, position_y FROM recently_played_tracks_user_spotify WHERE activate=true AND id_spotify_service=(SELECT id FROM spotify_service WHERE id_user = $1)
`;

app.get('/widgets', JWTService.authenticateToken, (req, res) => {


    pool.getPool().query(request, [req.user.user_id], (err, result) => {
        if (err) {
            res.sendStatus(503);
        } else {
            res.status(200);
            res.json(result.rows);
        }
    });
});

app.put('/widgets', JWTService.authenticateToken, (req, res) => {

    const widgetNames = {
        'City meteo weather': {
            widgetTable: 'city_meteo_weather',
            serviceTable: 'weather_service'
        },
        'Country case covid': {
            widgetTable: 'country_case_covid',
            serviceTable: 'covid_service'
        },
        'Summary country covid': {
            widgetTable: 'summary_country_covid',
            serviceTable: 'covid_service'
        },
        'Search tweets twitter': {
            widgetTable: 'search_tweets_twitter',
            serviceTable: 'twitter_service'
        },
        'Last tweets twitter': {
            widgetTable: 'last_tweets_twitter',
            serviceTable: 'twitter_service'
        },
        'Channels videos youtube': {
            widgetTable: 'channel_videos_youtube',
            serviceTable: 'youtube_service'
        },
        'Comments video youtube': {
            widgetTable: 'comments_video_youtube',
            serviceTable: 'youtube_service'
        },
        'Statistics video youtube': {
            widgetTable: 'statistics_video_youtube',
            serviceTable: 'youtube_service'
        },
        'Statistics channel youtube': {
            widgetTable: 'statistics_channel_youtube',
            serviceTable: 'youtube_service'
        },
        'Top tracks user spotify': {
            widgetTable: 'top_tracks_user_spotify',
            serviceTable: 'spotify_service'
        },
        'Top artists user spotify': {
            widgetTable: 'top_artists_user_spotify',
            serviceTable: 'spotify_service'
        },
        'Recently played tracks user spotify': {
            widgetTable: 'recently_played_tracks_user_spotify',
            serviceTable: 'spotify_service'
        },
    }

    const data = req.body.data;
    let good = true;

    pool.getPool().query(request, [req.user.user_id], (err, result) => {
        if (err) {
            res.sendStatus(503);
            return;
        }

        if (result.rows.length !== data.length) {
            res.sendStatus(404);
            return;
        }
        data.forEach((d) => {
            if (data.find((element) => element.id !== d.id && element.position_x === d.position_x && element.position_y === d.position_y)) {
                res.sendStatus(404)
                good = false;
            }
        });

        if (good === false) {
            return;
        }

        function updateWidgetPos(data, req, i) {
            if (data.length === i) {
                res.sendStatus(200);
                return;
            }
            console.log('UPDATE ' + widgetNames[data[i].name].widgetTable + ' SET position_x = $2, position_y = $3 WHERE id_' + widgetNames[data[i].name].serviceTable + ' = (SELECT id FROM weather_service WHERE id_user = $1)');
            pool.getPool().query('UPDATE ' + widgetNames[data[i].name].widgetTable + ' SET position_x = $2, position_y = $3 WHERE id_' + widgetNames[data[i].name].serviceTable + ' = (SELECT id FROM ' + widgetNames[data[i].name].serviceTable + ' WHERE id_user = $1)', [req.user.user_id, data[i].position_x, data[i].position_y], (err, result) => {
                if (err) {
                    res.sendStatus(503);
                } else {
                    updateWidgetPos(data, req, i + 1);
                }
            });
        }
        updateWidgetPos(data, req, 0);
    });
});

// connect react to nodejs express server
const server = app.listen(port, () => console.log(`Server is running on port ${port}!`));

module.exports = server;