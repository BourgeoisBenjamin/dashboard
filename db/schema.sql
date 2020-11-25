--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Debian 12.4-1.pgdg100+1)
-- Dumped by pg_dump version 12.4

-- Started on 2020-11-24 21:21:13 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16385)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 3127 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16422)
-- Name: channel_videos_youtube; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.channel_videos_youtube (
    id bigint NOT NULL,
    id_youtube_service bigint NOT NULL,
    activate boolean NOT NULL,
    number_videos integer NOT NULL,
    id_channel character varying NOT NULL
);


ALTER TABLE public.channel_videos_youtube OWNER TO dashboard;

--
-- TOC entry 204 (class 1259 OID 16428)
-- Name: channels_videos_youtube_id_seq; Type: SEQUENCE; Schema: public; Owner: dashboard
--

CREATE SEQUENCE public.channels_videos_youtube_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.channels_videos_youtube_id_seq OWNER TO dashboard;

--
-- TOC entry 3128 (class 0 OID 0)
-- Dependencies: 204
-- Name: channels_videos_youtube_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.channels_videos_youtube_id_seq OWNED BY public.channel_videos_youtube.id;


--
-- TOC entry 205 (class 1259 OID 16430)
-- Name: city_meteo_weather; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.city_meteo_weather (
    id bigint NOT NULL,
    id_weather_service bigint NOT NULL,
    activate boolean NOT NULL,
    city character varying NOT NULL,
    celsius boolean NOT NULL
);


ALTER TABLE public.city_meteo_weather OWNER TO dashboard;

--
-- TOC entry 206 (class 1259 OID 16436)
-- Name: city_meteo_weather_id_seq; Type: SEQUENCE; Schema: public; Owner: dashboard
--

CREATE SEQUENCE public.city_meteo_weather_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.city_meteo_weather_id_seq OWNER TO dashboard;

--
-- TOC entry 3129 (class 0 OID 0)
-- Dependencies: 206
-- Name: city_meteo_weather_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.city_meteo_weather_id_seq OWNED BY public.city_meteo_weather.id;


--
-- TOC entry 207 (class 1259 OID 16438)
-- Name: comments_video_youtube; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.comments_video_youtube (
    id bigint NOT NULL,
    id_youtube_service bigint NOT NULL,
    activate boolean NOT NULL,
    number_comments integer NOT NULL,
    id_video character varying NOT NULL
);


ALTER TABLE public.comments_video_youtube OWNER TO dashboard;

--
-- TOC entry 208 (class 1259 OID 16444)
-- Name: comments_video_youtube_id_seq; Type: SEQUENCE; Schema: public; Owner: dashboard
--

CREATE SEQUENCE public.comments_video_youtube_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_video_youtube_id_seq OWNER TO dashboard;

--
-- TOC entry 3130 (class 0 OID 0)
-- Dependencies: 208
-- Name: comments_video_youtube_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.comments_video_youtube_id_seq OWNED BY public.comments_video_youtube.id;


--
-- TOC entry 209 (class 1259 OID 16446)
-- Name: country_case_covid; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.country_case_covid (
    id bigint NOT NULL,
    id_covid_service bigint NOT NULL,
    activate boolean NOT NULL,
    country character varying NOT NULL
);


ALTER TABLE public.country_case_covid OWNER TO dashboard;

--
-- TOC entry 210 (class 1259 OID 16452)
-- Name: country_case_covid_id_seq; Type: SEQUENCE; Schema: public; Owner: dashboard
--

CREATE SEQUENCE public.country_case_covid_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.country_case_covid_id_seq OWNER TO dashboard;

--
-- TOC entry 3131 (class 0 OID 0)
-- Dependencies: 210
-- Name: country_case_covid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.country_case_covid_id_seq OWNED BY public.country_case_covid.id;


--
-- TOC entry 211 (class 1259 OID 16454)
-- Name: covid_service; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.covid_service (
    id bigint NOT NULL,
    id_user bigint NOT NULL,
    activate boolean NOT NULL
);


ALTER TABLE public.covid_service OWNER TO dashboard;

--
-- TOC entry 212 (class 1259 OID 16457)
-- Name: covid_service_id_seq; Type: SEQUENCE; Schema: public; Owner: dashboard
--

CREATE SEQUENCE public.covid_service_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.covid_service_id_seq OWNER TO dashboard;

--
-- TOC entry 3132 (class 0 OID 0)
-- Dependencies: 212
-- Name: covid_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.covid_service_id_seq OWNED BY public.covid_service.id;


--
-- TOC entry 213 (class 1259 OID 16459)
-- Name: last_tweets_twitter; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.last_tweets_twitter (
    id bigint NOT NULL,
    id_twitter_service bigint NOT NULL,
    number_tweets integer NOT NULL,
    activate boolean NOT NULL
);


ALTER TABLE public.last_tweets_twitter OWNER TO dashboard;

--
-- TOC entry 214 (class 1259 OID 16462)
-- Name: last_tweets_twitter_id_seq; Type: SEQUENCE; Schema: public; Owner: dashboard
--

CREATE SEQUENCE public.last_tweets_twitter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.last_tweets_twitter_id_seq OWNER TO dashboard;

--
-- TOC entry 3133 (class 0 OID 0)
-- Dependencies: 214
-- Name: last_tweets_twitter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.last_tweets_twitter_id_seq OWNED BY public.last_tweets_twitter.id;


--
-- TOC entry 215 (class 1259 OID 16464)
-- Name: search_tweets_twitter; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.search_tweets_twitter (
    id bigint NOT NULL,
    id_twitter_service bigint NOT NULL,
    search character varying NOT NULL,
    activate boolean NOT NULL,
    number_tweets bigint NOT NULL
);


ALTER TABLE public.search_tweets_twitter OWNER TO dashboard;

--
-- TOC entry 216 (class 1259 OID 16470)
-- Name: search_tweets_twitter_id_seq; Type: SEQUENCE; Schema: public; Owner: dashboard
--

CREATE SEQUENCE public.search_tweets_twitter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.search_tweets_twitter_id_seq OWNER TO dashboard;

--
-- TOC entry 3134 (class 0 OID 0)
-- Dependencies: 216
-- Name: search_tweets_twitter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.search_tweets_twitter_id_seq OWNED BY public.search_tweets_twitter.id;


--
-- TOC entry 217 (class 1259 OID 16472)
-- Name: session; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO dashboard;

--
-- TOC entry 232 (class 1259 OID 16661)
-- Name: spotify_service; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.spotify_service (
    id_user bigint NOT NULL,
    activate boolean NOT NULL,
    access_token character varying NOT NULL,
    expires_in bigint NOT NULL,
    refresh_token character varying NOT NULL,
    token_type character varying NOT NULL,
    id bigint NOT NULL
);


ALTER TABLE public.spotify_service OWNER TO dashboard;

--
-- TOC entry 233 (class 1259 OID 16676)
-- Name: spotify_service_id_seq; Type: SEQUENCE; Schema: public; Owner: dashboard
--

CREATE SEQUENCE public.spotify_service_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spotify_service_id_seq OWNER TO dashboard;

--
-- TOC entry 3135 (class 0 OID 0)
-- Dependencies: 233
-- Name: spotify_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.spotify_service_id_seq OWNED BY public.spotify_service.id;


--
-- TOC entry 218 (class 1259 OID 16478)
-- Name: statistics_channel_youtube; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.statistics_channel_youtube (
    id bigint NOT NULL,
    id_youtube_service bigint NOT NULL,
    activate boolean NOT NULL,
    id_channel character varying NOT NULL
);


ALTER TABLE public.statistics_channel_youtube OWNER TO dashboard;

--
-- TOC entry 219 (class 1259 OID 16484)
-- Name: statistics_video_youtube; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.statistics_video_youtube (
    id bigint NOT NULL,
    id_youtube_service bigint NOT NULL,
    activate boolean NOT NULL,
    id_video character varying NOT NULL
);


ALTER TABLE public.statistics_video_youtube OWNER TO dashboard;

--
-- TOC entry 220 (class 1259 OID 16490)
-- Name: subscribers_channels_youtube_id_seq; Type: SEQUENCE; Schema: public; Owner: dashboard
--

CREATE SEQUENCE public.subscribers_channels_youtube_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subscribers_channels_youtube_id_seq OWNER TO dashboard;

--
-- TOC entry 3136 (class 0 OID 0)
-- Dependencies: 220
-- Name: subscribers_channels_youtube_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.subscribers_channels_youtube_id_seq OWNED BY public.statistics_channel_youtube.id;


--
-- TOC entry 221 (class 1259 OID 16492)
-- Name: summary_country_covid; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.summary_country_covid (
    id bigint NOT NULL,
    id_covid_service bigint NOT NULL,
    activate boolean NOT NULL,
    country character varying NOT NULL
);


ALTER TABLE public.summary_country_covid OWNER TO dashboard;

--
-- TOC entry 222 (class 1259 OID 16498)
-- Name: summary_country_covid_id_seq; Type: SEQUENCE; Schema: public; Owner: dashboard
--

CREATE SEQUENCE public.summary_country_covid_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.summary_country_covid_id_seq OWNER TO dashboard;

--
-- TOC entry 3137 (class 0 OID 0)
-- Dependencies: 222
-- Name: summary_country_covid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.summary_country_covid_id_seq OWNED BY public.summary_country_covid.id;


--
-- TOC entry 223 (class 1259 OID 16500)
-- Name: twitter_service; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.twitter_service (
    id bigint NOT NULL,
    id_user bigint NOT NULL,
    token character varying NOT NULL,
    tokensecret character varying NOT NULL,
    twitter_id character varying NOT NULL,
    activate boolean DEFAULT false NOT NULL
);


ALTER TABLE public.twitter_service OWNER TO dashboard;

--
-- TOC entry 224 (class 1259 OID 16507)
-- Name: twitter_service_id_seq; Type: SEQUENCE; Schema: public; Owner: dashboard
--

CREATE SEQUENCE public.twitter_service_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.twitter_service_id_seq OWNER TO dashboard;

--
-- TOC entry 3138 (class 0 OID 0)
-- Dependencies: 224
-- Name: twitter_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.twitter_service_id_seq OWNED BY public.twitter_service.id;


--
-- TOC entry 225 (class 1259 OID 16509)
-- Name: users; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying,
    password character varying,
    email character varying,
    activate_email boolean DEFAULT false NOT NULL,
    tier_user_id character varying,
    tier_username character varying,
    token_email character(250),
    tier_name character varying,
    reset_password uuid
);


ALTER TABLE public.users OWNER TO dashboard;

--
-- TOC entry 226 (class 1259 OID 16516)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: dashboard
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO dashboard;

--
-- TOC entry 3139 (class 0 OID 0)
-- Dependencies: 226
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 227 (class 1259 OID 16518)
-- Name: views_video_youtube_id_seq; Type: SEQUENCE; Schema: public; Owner: dashboard
--

CREATE SEQUENCE public.views_video_youtube_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.views_video_youtube_id_seq OWNER TO dashboard;

--
-- TOC entry 3140 (class 0 OID 0)
-- Dependencies: 227
-- Name: views_video_youtube_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.views_video_youtube_id_seq OWNED BY public.statistics_video_youtube.id;


--
-- TOC entry 228 (class 1259 OID 16520)
-- Name: weather_service; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.weather_service (
    id bigint NOT NULL,
    id_user bigint NOT NULL,
    api_key character varying NOT NULL,
    activate boolean NOT NULL
);


ALTER TABLE public.weather_service OWNER TO dashboard;

--
-- TOC entry 229 (class 1259 OID 16526)
-- Name: weather_service_id_seq; Type: SEQUENCE; Schema: public; Owner: dashboard
--

CREATE SEQUENCE public.weather_service_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.weather_service_id_seq OWNER TO dashboard;

--
-- TOC entry 3141 (class 0 OID 0)
-- Dependencies: 229
-- Name: weather_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.weather_service_id_seq OWNED BY public.weather_service.id;


--
-- TOC entry 230 (class 1259 OID 16528)
-- Name: youtube_service; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.youtube_service (
    id bigint NOT NULL,
    id_user bigint NOT NULL,
    activate boolean NOT NULL,
    access_token character varying NOT NULL,
    expires_in bigint NOT NULL,
    refresh_token character varying NOT NULL,
    scope character varying NOT NULL,
    token_type character varying NOT NULL,
    id_token character varying NOT NULL
);


ALTER TABLE public.youtube_service OWNER TO dashboard;

--
-- TOC entry 231 (class 1259 OID 16534)
-- Name: youtube_service_id_seq; Type: SEQUENCE; Schema: public; Owner: dashboard
--

CREATE SEQUENCE public.youtube_service_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.youtube_service_id_seq OWNER TO dashboard;

--
-- TOC entry 3142 (class 0 OID 0)
-- Dependencies: 231
-- Name: youtube_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.youtube_service_id_seq OWNED BY public.youtube_service.id;


--
-- TOC entry 2916 (class 2604 OID 16536)
-- Name: channel_videos_youtube id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.channel_videos_youtube ALTER COLUMN id SET DEFAULT nextval('public.channels_videos_youtube_id_seq'::regclass);


--
-- TOC entry 2917 (class 2604 OID 16537)
-- Name: city_meteo_weather id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.city_meteo_weather ALTER COLUMN id SET DEFAULT nextval('public.city_meteo_weather_id_seq'::regclass);


--
-- TOC entry 2918 (class 2604 OID 16538)
-- Name: comments_video_youtube id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.comments_video_youtube ALTER COLUMN id SET DEFAULT nextval('public.comments_video_youtube_id_seq'::regclass);


--
-- TOC entry 2919 (class 2604 OID 16539)
-- Name: country_case_covid id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.country_case_covid ALTER COLUMN id SET DEFAULT nextval('public.country_case_covid_id_seq'::regclass);


--
-- TOC entry 2920 (class 2604 OID 16540)
-- Name: covid_service id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.covid_service ALTER COLUMN id SET DEFAULT nextval('public.covid_service_id_seq'::regclass);


--
-- TOC entry 2921 (class 2604 OID 16541)
-- Name: last_tweets_twitter id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.last_tweets_twitter ALTER COLUMN id SET DEFAULT nextval('public.last_tweets_twitter_id_seq'::regclass);


--
-- TOC entry 2922 (class 2604 OID 16542)
-- Name: search_tweets_twitter id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.search_tweets_twitter ALTER COLUMN id SET DEFAULT nextval('public.search_tweets_twitter_id_seq'::regclass);


--
-- TOC entry 2932 (class 2604 OID 16678)
-- Name: spotify_service id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.spotify_service ALTER COLUMN id SET DEFAULT nextval('public.spotify_service_id_seq'::regclass);


--
-- TOC entry 2923 (class 2604 OID 16543)
-- Name: statistics_channel_youtube id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.statistics_channel_youtube ALTER COLUMN id SET DEFAULT nextval('public.subscribers_channels_youtube_id_seq'::regclass);


--
-- TOC entry 2924 (class 2604 OID 16544)
-- Name: statistics_video_youtube id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.statistics_video_youtube ALTER COLUMN id SET DEFAULT nextval('public.views_video_youtube_id_seq'::regclass);


--
-- TOC entry 2925 (class 2604 OID 16545)
-- Name: summary_country_covid id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.summary_country_covid ALTER COLUMN id SET DEFAULT nextval('public.summary_country_covid_id_seq'::regclass);


--
-- TOC entry 2927 (class 2604 OID 16546)
-- Name: twitter_service id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.twitter_service ALTER COLUMN id SET DEFAULT nextval('public.twitter_service_id_seq'::regclass);


--
-- TOC entry 2929 (class 2604 OID 16547)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2930 (class 2604 OID 16548)
-- Name: weather_service id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.weather_service ALTER COLUMN id SET DEFAULT nextval('public.weather_service_id_seq'::regclass);


--
-- TOC entry 2931 (class 2604 OID 16549)
-- Name: youtube_service id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.youtube_service ALTER COLUMN id SET DEFAULT nextval('public.youtube_service_id_seq'::regclass);


--
-- TOC entry 2934 (class 2606 OID 16551)
-- Name: channel_videos_youtube channels_videos_youtube_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.channel_videos_youtube
    ADD CONSTRAINT channels_videos_youtube_pkey PRIMARY KEY (id);


--
-- TOC entry 2936 (class 2606 OID 16553)
-- Name: city_meteo_weather city_meteo_weather_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.city_meteo_weather
    ADD CONSTRAINT city_meteo_weather_pkey PRIMARY KEY (id);


--
-- TOC entry 2938 (class 2606 OID 16555)
-- Name: comments_video_youtube comments_video_youtube_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.comments_video_youtube
    ADD CONSTRAINT comments_video_youtube_pkey PRIMARY KEY (id);


--
-- TOC entry 2940 (class 2606 OID 16557)
-- Name: country_case_covid country_case_covid_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.country_case_covid
    ADD CONSTRAINT country_case_covid_pkey PRIMARY KEY (id);


--
-- TOC entry 2942 (class 2606 OID 16559)
-- Name: covid_service covid_service_id_user_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.covid_service
    ADD CONSTRAINT covid_service_id_user_key UNIQUE (id_user);


--
-- TOC entry 2944 (class 2606 OID 16561)
-- Name: covid_service covid_service_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.covid_service
    ADD CONSTRAINT covid_service_pkey PRIMARY KEY (id);


--
-- TOC entry 2946 (class 2606 OID 16563)
-- Name: last_tweets_twitter last_tweets_twitter_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.last_tweets_twitter
    ADD CONSTRAINT last_tweets_twitter_pkey PRIMARY KEY (id);


--
-- TOC entry 2948 (class 2606 OID 16565)
-- Name: search_tweets_twitter search_tweets_twitter_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.search_tweets_twitter
    ADD CONSTRAINT search_tweets_twitter_pkey PRIMARY KEY (id);


--
-- TOC entry 2951 (class 2606 OID 16567)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- TOC entry 2979 (class 2606 OID 16670)
-- Name: spotify_service spotify_service_id_user_unique; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.spotify_service
    ADD CONSTRAINT spotify_service_id_user_unique UNIQUE (id_user);


--
-- TOC entry 2981 (class 2606 OID 16687)
-- Name: spotify_service spotify_service_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.spotify_service
    ADD CONSTRAINT spotify_service_pkey PRIMARY KEY (id);


--
-- TOC entry 2953 (class 2606 OID 16569)
-- Name: statistics_channel_youtube subscribers_channels_youtube_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.statistics_channel_youtube
    ADD CONSTRAINT subscribers_channels_youtube_pkey PRIMARY KEY (id);


--
-- TOC entry 2957 (class 2606 OID 16571)
-- Name: summary_country_covid summary_country_covid_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.summary_country_covid
    ADD CONSTRAINT summary_country_covid_pkey PRIMARY KEY (id);


--
-- TOC entry 2959 (class 2606 OID 16573)
-- Name: twitter_service twitter_service_id_user_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.twitter_service
    ADD CONSTRAINT twitter_service_id_user_key UNIQUE (id_user);


--
-- TOC entry 2961 (class 2606 OID 16575)
-- Name: twitter_service twitter_service_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.twitter_service
    ADD CONSTRAINT twitter_service_pkey PRIMARY KEY (id);


--
-- TOC entry 2963 (class 2606 OID 16577)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2965 (class 2606 OID 16579)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2967 (class 2606 OID 16581)
-- Name: users users_tier_user_id; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tier_user_id UNIQUE (tier_user_id);


--
-- TOC entry 2969 (class 2606 OID 16583)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 2955 (class 2606 OID 16585)
-- Name: statistics_video_youtube views_video_youtube_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.statistics_video_youtube
    ADD CONSTRAINT views_video_youtube_pkey PRIMARY KEY (id);


--
-- TOC entry 2971 (class 2606 OID 16587)
-- Name: weather_service weather_service_id_user_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.weather_service
    ADD CONSTRAINT weather_service_id_user_key UNIQUE (id_user);


--
-- TOC entry 2973 (class 2606 OID 16589)
-- Name: weather_service weather_service_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.weather_service
    ADD CONSTRAINT weather_service_pkey PRIMARY KEY (id);


--
-- TOC entry 2975 (class 2606 OID 16591)
-- Name: youtube_service youtube_service_id_user_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.youtube_service
    ADD CONSTRAINT youtube_service_id_user_key UNIQUE (id_user);


--
-- TOC entry 2977 (class 2606 OID 16593)
-- Name: youtube_service youtube_service_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.youtube_service
    ADD CONSTRAINT youtube_service_pkey PRIMARY KEY (id);


--
-- TOC entry 2949 (class 1259 OID 16594)
-- Name: idx_session_expire; Type: INDEX; Schema: public; Owner: dashboard
--

CREATE INDEX idx_session_expire ON public.session USING btree (expire);


--
-- TOC entry 2982 (class 2606 OID 16595)
-- Name: channel_videos_youtube channels_videos_youtube_id_youtube_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.channel_videos_youtube
    ADD CONSTRAINT channels_videos_youtube_id_youtube_service_fkey FOREIGN KEY (id_youtube_service) REFERENCES public.youtube_service(id);


--
-- TOC entry 2983 (class 2606 OID 16600)
-- Name: city_meteo_weather city_meteo_weather_id_weather_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.city_meteo_weather
    ADD CONSTRAINT city_meteo_weather_id_weather_service_fkey FOREIGN KEY (id_weather_service) REFERENCES public.weather_service(id);


--
-- TOC entry 2984 (class 2606 OID 16605)
-- Name: comments_video_youtube comments_video_youtube_id_youtube_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.comments_video_youtube
    ADD CONSTRAINT comments_video_youtube_id_youtube_service_fkey FOREIGN KEY (id_youtube_service) REFERENCES public.youtube_service(id);


--
-- TOC entry 2985 (class 2606 OID 16610)
-- Name: country_case_covid country_case_covid_id_covid_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.country_case_covid
    ADD CONSTRAINT country_case_covid_id_covid_service_fkey FOREIGN KEY (id_covid_service) REFERENCES public.covid_service(id);


--
-- TOC entry 2986 (class 2606 OID 16615)
-- Name: covid_service covid_service_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.covid_service
    ADD CONSTRAINT covid_service_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- TOC entry 2987 (class 2606 OID 16620)
-- Name: last_tweets_twitter last_tweets_twitter_id_twitter_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.last_tweets_twitter
    ADD CONSTRAINT last_tweets_twitter_id_twitter_service_fkey FOREIGN KEY (id_twitter_service) REFERENCES public.twitter_service(id);


--
-- TOC entry 2988 (class 2606 OID 16625)
-- Name: search_tweets_twitter search_tweets_twitter_id_twitter_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.search_tweets_twitter
    ADD CONSTRAINT search_tweets_twitter_id_twitter_service_fkey FOREIGN KEY (id_twitter_service) REFERENCES public.twitter_service(id);


--
-- TOC entry 2995 (class 2606 OID 16671)
-- Name: spotify_service spotify_service_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.spotify_service
    ADD CONSTRAINT spotify_service_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- TOC entry 2989 (class 2606 OID 16630)
-- Name: statistics_channel_youtube subscribers_channels_youtube_id_youtube_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.statistics_channel_youtube
    ADD CONSTRAINT subscribers_channels_youtube_id_youtube_service_fkey FOREIGN KEY (id_youtube_service) REFERENCES public.youtube_service(id);


--
-- TOC entry 2991 (class 2606 OID 16635)
-- Name: summary_country_covid summary_country_covid_id_covid_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.summary_country_covid
    ADD CONSTRAINT summary_country_covid_id_covid_service_fkey FOREIGN KEY (id_covid_service) REFERENCES public.covid_service(id);


--
-- TOC entry 2992 (class 2606 OID 16640)
-- Name: twitter_service twitter_service_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.twitter_service
    ADD CONSTRAINT twitter_service_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- TOC entry 2990 (class 2606 OID 16645)
-- Name: statistics_video_youtube views_video_youtube_id_youtube_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.statistics_video_youtube
    ADD CONSTRAINT views_video_youtube_id_youtube_service_fkey FOREIGN KEY (id_youtube_service) REFERENCES public.youtube_service(id);


--
-- TOC entry 2993 (class 2606 OID 16650)
-- Name: weather_service weather_service_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.weather_service
    ADD CONSTRAINT weather_service_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- TOC entry 2994 (class 2606 OID 16655)
-- Name: youtube_service youtube_service_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.youtube_service
    ADD CONSTRAINT youtube_service_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


-- Completed on 2020-11-24 21:21:14 UTC

--
-- PostgreSQL database dump complete
--

