SELECT id, 'City meteo weather' AS NAME FROM city_meteo_weather WHERE activate=true AND id_weather_service=(SELECT id FROM weather_service WHERE id_user=1) UNION
SELECT id, 'Country case covid' AS NAME FROM country_case_covid WHERE activate=true AND id_covid_service=(SELECT id FROM covid_service WHERE id_user=1) UNION
SELECT id, 'Summary country covid' AS NAME FROM summary_country_covid WHERE activate=true AND id_covid_service=(SELECT id FROM covid_service WHERE id_user=1) UNION
SELECT id, 'Search tweets twitter' AS NAME FROM search_tweets_twitter WHERE activate=true AND id_twitter_service=(SELECT id FROM twitter_service WHERE id_user=1) UNION
SELECT id, 'Last tweets twitter' AS NAME FROM last_tweets_twitter WHERE activate=true AND id_twitter_service=(SELECT id FROM twitter_service WHERE id_user=1) UNION
SELECT id, 'Channels videos youtube' AS NAME FROM channels_videos_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user=1) UNION
SELECT id, 'Comments video youtube' AS NAME FROM comments_video_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user=1) UNION
SELECT id, 'Views video youtube' AS NAME FROM views_video_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user=1) UNION
SELECT id, 'Subscribers channels' AS NAME FROM subscribers_channels_youtube WHERE activate=true AND id_youtube_service=(SELECT id FROM youtube_service WHERE id_user=1)
