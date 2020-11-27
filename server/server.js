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
const loginTiersRoutes = require("./routes/account/login/tiers/tiers-routes");
const accountServiceRoutes = require("./routes/account/service/account-service-routes");
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
app.use("/account/login/tiers", loginTiersRoutes);
app.use("/account/service", accountServiceRoutes);
app.use("/service", weatherWidgetRoutes);
app.use("/service", covidWidgetRoutes);
app.use("/service", twitterWidgetRoutes);
app.use("/service", spotifyWidgetRoutes);
app.use("/service", youtubeWidgetRoutes);

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Hello world !!');
});

app.get('/widgets', JWTService.authenticateToken, (req, res) => {

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

    const request = `
        SELECT id, 'City meteo weather' AS NAME FROM city_meteo_weather WHERE activate=true AND id_weather_service=(SELECT id FROM weather_service WHERE id_user = $1) UNION
        SELECT id, 'Country case covid' AS NAME FROM country_case_covid WHERE activate=true AND id_covid_service=(SELECT id FROM covid_service WHERE id_user = $1) UNION
        SELECT id, 'Summary country covid' AS NAME FROM summary_country_covid WHERE activate=true AND id_covid_service=(SELECT id FROM covid_service WHERE id_user = $1) UNION
        SELECT id, 'Search tweets twitter' AS NAME FROM search_tweets_twitter WHERE activate=true AND id_twitter_service=(SELECT id FROM twitter_service WHERE id_user = $1) UNION
        SELECT id, 'Last tweets twitter' AS NAME FROM last_tweets_twitter WHERE activate=true AND id_twitter_service=(SELECT id FROM twitter_service WHERE id_user = $1) UNION
        SELECT id, 'Channels videos youtube' AS NAME FROM channel_videos_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user = $1) UNION
        SELECT id, 'Comments video youtube' AS NAME FROM comments_video_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user = $1) UNION
        SELECT id, 'Statistics video youtube' AS NAME FROM statistics_video_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user = $1) UNION
        SELECT id, 'Statistics channel youtube' AS NAME FROM statistics_channel_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user = $1) UNION
        SELECT id, 'Top tracks user spotify' AS NAME FROM top_tracks_user_spotify WHERE activate=true AND id_spotify_service=(SELECT id FROM spotify_service WHERE id_user = $1) UNION
        SELECT id, 'Top artists user spotify' AS NAME FROM top_artists_user_spotify WHERE activate=true AND id_spotify_service=(SELECT id FROM spotify_service WHERE id_user = $1) UNION
        SELECT id, 'Recently played tracks user spotify' AS NAME FROM recently_played_tracks_user_spotify WHERE activate=true AND id_spotify_service=(SELECT id FROM spotify_service WHERE id_user = $1)
    `;

    pool.getPool().query(request, [req.user.user_id], (err, result) => {
        if (err) {
            res.sendStatus(503);
        } else {
            res.status(200);
            res.json(result.rows);
        }
    });
});

// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`));