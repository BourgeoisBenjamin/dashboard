const pool = require('../services/postgresql');

module.exports = {
    findPosition: function(req, postRequestFct)
    {
        const request = `
        SELECT position_x, position_y FROM city_meteo_weather WHERE activate=true AND id_weather_service=(SELECT id FROM weather_service WHERE id_user = $1) UNION
        SELECT position_x, position_y FROM country_case_covid WHERE activate=true AND id_covid_service=(SELECT id FROM covid_service WHERE id_user = $1) UNION
        SELECT position_x, position_y FROM summary_country_covid WHERE activate=true AND id_covid_service=(SELECT id FROM covid_service WHERE id_user = $1) UNION
        SELECT position_x, position_y FROM search_tweets_twitter WHERE activate=true AND id_twitter_service=(SELECT id FROM twitter_service WHERE id_user = $1) UNION
        SELECT position_x, position_y FROM last_tweets_twitter WHERE activate=true AND id_twitter_service=(SELECT id FROM twitter_service WHERE id_user = $1) UNION
        SELECT position_x, position_y FROM channel_videos_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user = $1) UNION
        SELECT position_x, position_y FROM comments_video_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user = $1) UNION
        SELECT position_x, position_y FROM statistics_video_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user = $1) UNION
        SELECT position_x, position_y FROM statistics_channel_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user = $1) UNION
        SELECT position_x, position_y FROM top_tracks_user_spotify WHERE activate=true AND id_spotify_service=(SELECT id FROM spotify_service WHERE id_user = $1) UNION
        SELECT position_x, position_y FROM top_artists_user_spotify WHERE activate=true AND id_spotify_service=(SELECT id FROM spotify_service WHERE id_user = $1) UNION
        SELECT position_x, position_y FROM recently_played_tracks_user_spotify WHERE activate=true AND id_spotify_service=(SELECT id FROM spotify_service WHERE id_user = $1)
    `;

        pool.getPool().query(request, [req.user.user_id], (err, result) => {
            const position = function findPosition(rows, x) {
                const lineIsTaken = [false, false, false, false];

                for (let i = 0; i < rows.length; i++) {
                    if (rows[i].position_x === x) {
                        lineIsTaken[rows[i].position_y] = true;
                    }
                }
                for (let i = 0; i < lineIsTaken.length; i++) {
                    if (lineIsTaken[i] === false) {
                        return ({ x: x, y: i });
                    }
                }
                return findPosition(rows, x + 1);
            }(result.rows, 0);

            postRequestFct(position);
        });
    }
}