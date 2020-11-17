--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Debian 12.4-1.pgdg100+1)
-- Dumped by pg_dump version 12.4

-- Started on 2020-11-17 17:43:16 UTC

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
-- TOC entry 2 (class 3079 OID 16601)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 3134 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 16385)
-- Name: channels_videos_youtube; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.channels_videos_youtube (
    id bigint NOT NULL,
    id_youtube_service bigint NOT NULL,
    activate boolean NOT NULL,
    channel bigint NOT NULL,
    number_videos integer NOT NULL
);


ALTER TABLE public.channels_videos_youtube OWNER TO dashboard;

--
-- TOC entry 204 (class 1259 OID 16388)
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
-- TOC entry 3135 (class 0 OID 0)
-- Dependencies: 204
-- Name: channels_videos_youtube_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.channels_videos_youtube_id_seq OWNED BY public.channels_videos_youtube.id;


--
-- TOC entry 205 (class 1259 OID 16390)
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
-- TOC entry 206 (class 1259 OID 16396)
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
-- TOC entry 3136 (class 0 OID 0)
-- Dependencies: 206
-- Name: city_meteo_weather_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.city_meteo_weather_id_seq OWNED BY public.city_meteo_weather.id;


--
-- TOC entry 207 (class 1259 OID 16398)
-- Name: comments_video_youtube; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.comments_video_youtube (
    id bigint NOT NULL,
    id_youtube_service bigint NOT NULL,
    activate boolean NOT NULL,
    number_comments integer NOT NULL,
    id_video bigint NOT NULL
);


ALTER TABLE public.comments_video_youtube OWNER TO dashboard;

--
-- TOC entry 208 (class 1259 OID 16401)
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
-- TOC entry 3137 (class 0 OID 0)
-- Dependencies: 208
-- Name: comments_video_youtube_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.comments_video_youtube_id_seq OWNED BY public.comments_video_youtube.id;


--
-- TOC entry 209 (class 1259 OID 16403)
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
-- TOC entry 210 (class 1259 OID 16409)
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
-- TOC entry 3138 (class 0 OID 0)
-- Dependencies: 210
-- Name: country_case_covid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.country_case_covid_id_seq OWNED BY public.country_case_covid.id;


--
-- TOC entry 211 (class 1259 OID 16411)
-- Name: covid_service; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.covid_service (
    id bigint NOT NULL,
    id_user bigint NOT NULL
);


ALTER TABLE public.covid_service OWNER TO dashboard;

--
-- TOC entry 212 (class 1259 OID 16414)
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
-- TOC entry 3139 (class 0 OID 0)
-- Dependencies: 212
-- Name: covid_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.covid_service_id_seq OWNED BY public.covid_service.id;


--
-- TOC entry 213 (class 1259 OID 16416)
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
-- TOC entry 214 (class 1259 OID 16419)
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
-- TOC entry 3140 (class 0 OID 0)
-- Dependencies: 214
-- Name: last_tweets_twitter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.last_tweets_twitter_id_seq OWNED BY public.last_tweets_twitter.id;


--
-- TOC entry 215 (class 1259 OID 16421)
-- Name: search_tweets_twitter; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.search_tweets_twitter (
    id bigint NOT NULL,
    id_twitter_service bigint NOT NULL,
    search character varying NOT NULL,
    activate boolean NOT NULL
);


ALTER TABLE public.search_tweets_twitter OWNER TO dashboard;

--
-- TOC entry 216 (class 1259 OID 16427)
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
-- TOC entry 3141 (class 0 OID 0)
-- Dependencies: 216
-- Name: search_tweets_twitter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.search_tweets_twitter_id_seq OWNED BY public.search_tweets_twitter.id;


--
-- TOC entry 217 (class 1259 OID 16429)
-- Name: session; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO dashboard;

--
-- TOC entry 218 (class 1259 OID 16435)
-- Name: subscribers_channels_youtube; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.subscribers_channels_youtube (
    id bigint NOT NULL,
    id_youtube_service bigint NOT NULL,
    activate boolean NOT NULL,
    id_channel bigint NOT NULL
);


ALTER TABLE public.subscribers_channels_youtube OWNER TO dashboard;

--
-- TOC entry 219 (class 1259 OID 16438)
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
-- TOC entry 3142 (class 0 OID 0)
-- Dependencies: 219
-- Name: subscribers_channels_youtube_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.subscribers_channels_youtube_id_seq OWNED BY public.subscribers_channels_youtube.id;


--
-- TOC entry 220 (class 1259 OID 16440)
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
-- TOC entry 221 (class 1259 OID 16446)
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
-- TOC entry 3143 (class 0 OID 0)
-- Dependencies: 221
-- Name: summary_country_covid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.summary_country_covid_id_seq OWNED BY public.summary_country_covid.id;


--
-- TOC entry 222 (class 1259 OID 16448)
-- Name: twitter_service; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.twitter_service (
    id bigint NOT NULL,
    id_user bigint NOT NULL
);


ALTER TABLE public.twitter_service OWNER TO dashboard;

--
-- TOC entry 223 (class 1259 OID 16451)
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
-- TOC entry 3144 (class 0 OID 0)
-- Dependencies: 223
-- Name: twitter_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.twitter_service_id_seq OWNED BY public.twitter_service.id;


--
-- TOC entry 224 (class 1259 OID 16453)
-- Name: users; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying,
    password character varying,
    email character varying,
    activate_email boolean NOT NULL,
    user_token character varying,
    user_tokensecret character varying,
    user_id bigint
);


ALTER TABLE public.users OWNER TO dashboard;

--
-- TOC entry 225 (class 1259 OID 16459)
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
-- TOC entry 3145 (class 0 OID 0)
-- Dependencies: 225
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 226 (class 1259 OID 16461)
-- Name: views_video_youtube; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.views_video_youtube (
    id bigint NOT NULL,
    id_youtube_service bigint NOT NULL,
    activate boolean NOT NULL,
    id_video bigint NOT NULL
);


ALTER TABLE public.views_video_youtube OWNER TO dashboard;

--
-- TOC entry 227 (class 1259 OID 16464)
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
-- TOC entry 3146 (class 0 OID 0)
-- Dependencies: 227
-- Name: views_video_youtube_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.views_video_youtube_id_seq OWNED BY public.views_video_youtube.id;


--
-- TOC entry 228 (class 1259 OID 16466)
-- Name: weather_service; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.weather_service (
    id bigint NOT NULL,
    id_user bigint NOT NULL
);


ALTER TABLE public.weather_service OWNER TO dashboard;

--
-- TOC entry 229 (class 1259 OID 16469)
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
-- TOC entry 3147 (class 0 OID 0)
-- Dependencies: 229
-- Name: weather_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.weather_service_id_seq OWNED BY public.weather_service.id;


--
-- TOC entry 230 (class 1259 OID 16471)
-- Name: youtube_service; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.youtube_service (
    id bigint NOT NULL,
    id_user bigint NOT NULL
);


ALTER TABLE public.youtube_service OWNER TO dashboard;

--
-- TOC entry 231 (class 1259 OID 16474)
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
-- TOC entry 3148 (class 0 OID 0)
-- Dependencies: 231
-- Name: youtube_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.youtube_service_id_seq OWNED BY public.youtube_service.id;


--
-- TOC entry 2902 (class 2604 OID 16476)
-- Name: channels_videos_youtube id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.channels_videos_youtube ALTER COLUMN id SET DEFAULT nextval('public.channels_videos_youtube_id_seq'::regclass);


--
-- TOC entry 2903 (class 2604 OID 16477)
-- Name: city_meteo_weather id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.city_meteo_weather ALTER COLUMN id SET DEFAULT nextval('public.city_meteo_weather_id_seq'::regclass);


--
-- TOC entry 2904 (class 2604 OID 16478)
-- Name: comments_video_youtube id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.comments_video_youtube ALTER COLUMN id SET DEFAULT nextval('public.comments_video_youtube_id_seq'::regclass);


--
-- TOC entry 2905 (class 2604 OID 16479)
-- Name: country_case_covid id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.country_case_covid ALTER COLUMN id SET DEFAULT nextval('public.country_case_covid_id_seq'::regclass);


--
-- TOC entry 2906 (class 2604 OID 16480)
-- Name: covid_service id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.covid_service ALTER COLUMN id SET DEFAULT nextval('public.covid_service_id_seq'::regclass);


--
-- TOC entry 2907 (class 2604 OID 16481)
-- Name: last_tweets_twitter id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.last_tweets_twitter ALTER COLUMN id SET DEFAULT nextval('public.last_tweets_twitter_id_seq'::regclass);


--
-- TOC entry 2908 (class 2604 OID 16482)
-- Name: search_tweets_twitter id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.search_tweets_twitter ALTER COLUMN id SET DEFAULT nextval('public.search_tweets_twitter_id_seq'::regclass);


--
-- TOC entry 2909 (class 2604 OID 16483)
-- Name: subscribers_channels_youtube id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.subscribers_channels_youtube ALTER COLUMN id SET DEFAULT nextval('public.subscribers_channels_youtube_id_seq'::regclass);


--
-- TOC entry 2910 (class 2604 OID 16484)
-- Name: summary_country_covid id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.summary_country_covid ALTER COLUMN id SET DEFAULT nextval('public.summary_country_covid_id_seq'::regclass);


--
-- TOC entry 2911 (class 2604 OID 16485)
-- Name: twitter_service id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.twitter_service ALTER COLUMN id SET DEFAULT nextval('public.twitter_service_id_seq'::regclass);


--
-- TOC entry 2912 (class 2604 OID 16486)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2913 (class 2604 OID 16487)
-- Name: views_video_youtube id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.views_video_youtube ALTER COLUMN id SET DEFAULT nextval('public.views_video_youtube_id_seq'::regclass);


--
-- TOC entry 2914 (class 2604 OID 16488)
-- Name: weather_service id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.weather_service ALTER COLUMN id SET DEFAULT nextval('public.weather_service_id_seq'::regclass);


--
-- TOC entry 2915 (class 2604 OID 16489)
-- Name: youtube_service id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.youtube_service ALTER COLUMN id SET DEFAULT nextval('public.youtube_service_id_seq'::regclass);


--
-- TOC entry 3100 (class 0 OID 16385)
-- Dependencies: 203
-- Data for Name: channels_videos_youtube; Type: TABLE DATA; Schema: public; Owner: dashboard
--

COPY public.channels_videos_youtube (id, id_youtube_service, activate, channel, number_videos) FROM stdin;
\.


--
-- TOC entry 3102 (class 0 OID 16390)
-- Dependencies: 205
-- Data for Name: city_meteo_weather; Type: TABLE DATA; Schema: public; Owner: dashboard
--

COPY public.city_meteo_weather (id, id_weather_service, activate, city, celsius) FROM stdin;
\.


--
-- TOC entry 3104 (class 0 OID 16398)
-- Dependencies: 207
-- Data for Name: comments_video_youtube; Type: TABLE DATA; Schema: public; Owner: dashboard
--

COPY public.comments_video_youtube (id, id_youtube_service, activate, number_comments, id_video) FROM stdin;
\.


--
-- TOC entry 3106 (class 0 OID 16403)
-- Dependencies: 209
-- Data for Name: country_case_covid; Type: TABLE DATA; Schema: public; Owner: dashboard
--

COPY public.country_case_covid (id, id_covid_service, activate, country) FROM stdin;
\.


--
-- TOC entry 3108 (class 0 OID 16411)
-- Dependencies: 211
-- Data for Name: covid_service; Type: TABLE DATA; Schema: public; Owner: dashboard
--

COPY public.covid_service (id, id_user) FROM stdin;
\.


--
-- TOC entry 3110 (class 0 OID 16416)
-- Dependencies: 213
-- Data for Name: last_tweets_twitter; Type: TABLE DATA; Schema: public; Owner: dashboard
--

COPY public.last_tweets_twitter (id, id_twitter_service, number_tweets, activate) FROM stdin;
\.


--
-- TOC entry 3112 (class 0 OID 16421)
-- Dependencies: 215
-- Data for Name: search_tweets_twitter; Type: TABLE DATA; Schema: public; Owner: dashboard
--

COPY public.search_tweets_twitter (id, id_twitter_service, search, activate) FROM stdin;
\.


--
-- TOC entry 3114 (class 0 OID 16429)
-- Dependencies: 217
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: dashboard
--

COPY public.session (sid, sess, expire) FROM stdin;
\.


--
-- TOC entry 3115 (class 0 OID 16435)
-- Dependencies: 218
-- Data for Name: subscribers_channels_youtube; Type: TABLE DATA; Schema: public; Owner: dashboard
--

COPY public.subscribers_channels_youtube (id, id_youtube_service, activate, id_channel) FROM stdin;
\.


--
-- TOC entry 3117 (class 0 OID 16440)
-- Dependencies: 220
-- Data for Name: summary_country_covid; Type: TABLE DATA; Schema: public; Owner: dashboard
--

COPY public.summary_country_covid (id, id_covid_service, activate, country) FROM stdin;
\.


--
-- TOC entry 3119 (class 0 OID 16448)
-- Dependencies: 222
-- Data for Name: twitter_service; Type: TABLE DATA; Schema: public; Owner: dashboard
--

COPY public.twitter_service (id, id_user) FROM stdin;
\.


--
-- TOC entry 3121 (class 0 OID 16453)
-- Dependencies: 224
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dashboard
--

COPY public.users (id, username, password, email, activate_email, user_token, user_tokensecret, user_id) FROM stdin;
5	amaury	$2a$06$EZEc4BzIO7CpxMmUuxYRO.RQFT0aU.4gPisvMqqc18USkKRgMRJyW	amaury.lecomte1@gmail.com	f	\N	\N	\N
\.


--
-- TOC entry 3123 (class 0 OID 16461)
-- Dependencies: 226
-- Data for Name: views_video_youtube; Type: TABLE DATA; Schema: public; Owner: dashboard
--

COPY public.views_video_youtube (id, id_youtube_service, activate, id_video) FROM stdin;
\.


--
-- TOC entry 3125 (class 0 OID 16466)
-- Dependencies: 228
-- Data for Name: weather_service; Type: TABLE DATA; Schema: public; Owner: dashboard
--

COPY public.weather_service (id, id_user) FROM stdin;
\.


--
-- TOC entry 3127 (class 0 OID 16471)
-- Dependencies: 230
-- Data for Name: youtube_service; Type: TABLE DATA; Schema: public; Owner: dashboard
--

COPY public.youtube_service (id, id_user) FROM stdin;
\.


--
-- TOC entry 3149 (class 0 OID 0)
-- Dependencies: 204
-- Name: channels_videos_youtube_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dashboard
--

SELECT pg_catalog.setval('public.channels_videos_youtube_id_seq', 1, false);


--
-- TOC entry 3150 (class 0 OID 0)
-- Dependencies: 206
-- Name: city_meteo_weather_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dashboard
--

SELECT pg_catalog.setval('public.city_meteo_weather_id_seq', 1, false);


--
-- TOC entry 3151 (class 0 OID 0)
-- Dependencies: 208
-- Name: comments_video_youtube_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dashboard
--

SELECT pg_catalog.setval('public.comments_video_youtube_id_seq', 1, false);


--
-- TOC entry 3152 (class 0 OID 0)
-- Dependencies: 210
-- Name: country_case_covid_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dashboard
--

SELECT pg_catalog.setval('public.country_case_covid_id_seq', 1, false);


--
-- TOC entry 3153 (class 0 OID 0)
-- Dependencies: 212
-- Name: covid_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dashboard
--

SELECT pg_catalog.setval('public.covid_service_id_seq', 1, false);


--
-- TOC entry 3154 (class 0 OID 0)
-- Dependencies: 214
-- Name: last_tweets_twitter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dashboard
--

SELECT pg_catalog.setval('public.last_tweets_twitter_id_seq', 1, false);


--
-- TOC entry 3155 (class 0 OID 0)
-- Dependencies: 216
-- Name: search_tweets_twitter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dashboard
--

SELECT pg_catalog.setval('public.search_tweets_twitter_id_seq', 1, false);


--
-- TOC entry 3156 (class 0 OID 0)
-- Dependencies: 219
-- Name: subscribers_channels_youtube_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dashboard
--

SELECT pg_catalog.setval('public.subscribers_channels_youtube_id_seq', 1, false);


--
-- TOC entry 3157 (class 0 OID 0)
-- Dependencies: 221
-- Name: summary_country_covid_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dashboard
--

SELECT pg_catalog.setval('public.summary_country_covid_id_seq', 1, false);


--
-- TOC entry 3158 (class 0 OID 0)
-- Dependencies: 223
-- Name: twitter_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dashboard
--

SELECT pg_catalog.setval('public.twitter_service_id_seq', 1, false);


--
-- TOC entry 3159 (class 0 OID 0)
-- Dependencies: 225
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dashboard
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- TOC entry 3160 (class 0 OID 0)
-- Dependencies: 227
-- Name: views_video_youtube_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dashboard
--

SELECT pg_catalog.setval('public.views_video_youtube_id_seq', 1, false);


--
-- TOC entry 3161 (class 0 OID 0)
-- Dependencies: 229
-- Name: weather_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dashboard
--

SELECT pg_catalog.setval('public.weather_service_id_seq', 1, false);


--
-- TOC entry 3162 (class 0 OID 0)
-- Dependencies: 231
-- Name: youtube_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dashboard
--

SELECT pg_catalog.setval('public.youtube_service_id_seq', 1, false);


--
-- TOC entry 2917 (class 2606 OID 16491)
-- Name: channels_videos_youtube channels_videos_youtube_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.channels_videos_youtube
    ADD CONSTRAINT channels_videos_youtube_pkey PRIMARY KEY (id);


--
-- TOC entry 2919 (class 2606 OID 16493)
-- Name: city_meteo_weather city_meteo_weather_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.city_meteo_weather
    ADD CONSTRAINT city_meteo_weather_pkey PRIMARY KEY (id);


--
-- TOC entry 2921 (class 2606 OID 16495)
-- Name: comments_video_youtube comments_video_youtube_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.comments_video_youtube
    ADD CONSTRAINT comments_video_youtube_pkey PRIMARY KEY (id);


--
-- TOC entry 2923 (class 2606 OID 16497)
-- Name: country_case_covid country_case_covid_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.country_case_covid
    ADD CONSTRAINT country_case_covid_pkey PRIMARY KEY (id);


--
-- TOC entry 2925 (class 2606 OID 16499)
-- Name: covid_service covid_service_id_user_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.covid_service
    ADD CONSTRAINT covid_service_id_user_key UNIQUE (id_user);


--
-- TOC entry 2927 (class 2606 OID 16501)
-- Name: covid_service covid_service_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.covid_service
    ADD CONSTRAINT covid_service_pkey PRIMARY KEY (id);


--
-- TOC entry 2929 (class 2606 OID 16503)
-- Name: last_tweets_twitter last_tweets_twitter_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.last_tweets_twitter
    ADD CONSTRAINT last_tweets_twitter_pkey PRIMARY KEY (id);


--
-- TOC entry 2931 (class 2606 OID 16505)
-- Name: search_tweets_twitter search_tweets_twitter_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.search_tweets_twitter
    ADD CONSTRAINT search_tweets_twitter_pkey PRIMARY KEY (id);


--
-- TOC entry 2934 (class 2606 OID 16507)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- TOC entry 2936 (class 2606 OID 16509)
-- Name: subscribers_channels_youtube subscribers_channels_youtube_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.subscribers_channels_youtube
    ADD CONSTRAINT subscribers_channels_youtube_pkey PRIMARY KEY (id);


--
-- TOC entry 2938 (class 2606 OID 16511)
-- Name: summary_country_covid summary_country_covid_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.summary_country_covid
    ADD CONSTRAINT summary_country_covid_pkey PRIMARY KEY (id);


--
-- TOC entry 2940 (class 2606 OID 16513)
-- Name: twitter_service twitter_service_id_user_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.twitter_service
    ADD CONSTRAINT twitter_service_id_user_key UNIQUE (id_user);


--
-- TOC entry 2942 (class 2606 OID 16515)
-- Name: twitter_service twitter_service_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.twitter_service
    ADD CONSTRAINT twitter_service_pkey PRIMARY KEY (id);


--
-- TOC entry 2944 (class 2606 OID 16517)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2946 (class 2606 OID 16519)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2948 (class 2606 OID 16521)
-- Name: users users_user_id; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_id UNIQUE (user_id);


--
-- TOC entry 2950 (class 2606 OID 16523)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 2952 (class 2606 OID 16525)
-- Name: views_video_youtube views_video_youtube_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.views_video_youtube
    ADD CONSTRAINT views_video_youtube_pkey PRIMARY KEY (id);


--
-- TOC entry 2954 (class 2606 OID 16527)
-- Name: weather_service weather_service_id_user_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.weather_service
    ADD CONSTRAINT weather_service_id_user_key UNIQUE (id_user);


--
-- TOC entry 2956 (class 2606 OID 16529)
-- Name: weather_service weather_service_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.weather_service
    ADD CONSTRAINT weather_service_pkey PRIMARY KEY (id);


--
-- TOC entry 2958 (class 2606 OID 16531)
-- Name: youtube_service youtube_service_id_user_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.youtube_service
    ADD CONSTRAINT youtube_service_id_user_key UNIQUE (id_user);


--
-- TOC entry 2960 (class 2606 OID 16533)
-- Name: youtube_service youtube_service_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.youtube_service
    ADD CONSTRAINT youtube_service_pkey PRIMARY KEY (id);


--
-- TOC entry 2932 (class 1259 OID 16534)
-- Name: idx_session_expire; Type: INDEX; Schema: public; Owner: dashboard
--

CREATE INDEX idx_session_expire ON public.session USING btree (expire);


--
-- TOC entry 2961 (class 2606 OID 16535)
-- Name: channels_videos_youtube channels_videos_youtube_id_youtube_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.channels_videos_youtube
    ADD CONSTRAINT channels_videos_youtube_id_youtube_service_fkey FOREIGN KEY (id_youtube_service) REFERENCES public.youtube_service(id);


--
-- TOC entry 2962 (class 2606 OID 16540)
-- Name: city_meteo_weather city_meteo_weather_id_weather_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.city_meteo_weather
    ADD CONSTRAINT city_meteo_weather_id_weather_service_fkey FOREIGN KEY (id_weather_service) REFERENCES public.weather_service(id);


--
-- TOC entry 2963 (class 2606 OID 16545)
-- Name: comments_video_youtube comments_video_youtube_id_youtube_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.comments_video_youtube
    ADD CONSTRAINT comments_video_youtube_id_youtube_service_fkey FOREIGN KEY (id_youtube_service) REFERENCES public.youtube_service(id);


--
-- TOC entry 2964 (class 2606 OID 16550)
-- Name: country_case_covid country_case_covid_id_covid_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.country_case_covid
    ADD CONSTRAINT country_case_covid_id_covid_service_fkey FOREIGN KEY (id_covid_service) REFERENCES public.covid_service(id);


--
-- TOC entry 2965 (class 2606 OID 16555)
-- Name: covid_service covid_service_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.covid_service
    ADD CONSTRAINT covid_service_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- TOC entry 2966 (class 2606 OID 16560)
-- Name: last_tweets_twitter last_tweets_twitter_id_twitter_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.last_tweets_twitter
    ADD CONSTRAINT last_tweets_twitter_id_twitter_service_fkey FOREIGN KEY (id_twitter_service) REFERENCES public.twitter_service(id);


--
-- TOC entry 2967 (class 2606 OID 16565)
-- Name: search_tweets_twitter search_tweets_twitter_id_twitter_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.search_tweets_twitter
    ADD CONSTRAINT search_tweets_twitter_id_twitter_service_fkey FOREIGN KEY (id_twitter_service) REFERENCES public.twitter_service(id);


--
-- TOC entry 2968 (class 2606 OID 16570)
-- Name: subscribers_channels_youtube subscribers_channels_youtube_id_youtube_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.subscribers_channels_youtube
    ADD CONSTRAINT subscribers_channels_youtube_id_youtube_service_fkey FOREIGN KEY (id_youtube_service) REFERENCES public.youtube_service(id);


--
-- TOC entry 2969 (class 2606 OID 16575)
-- Name: summary_country_covid summary_country_covid_id_covid_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.summary_country_covid
    ADD CONSTRAINT summary_country_covid_id_covid_service_fkey FOREIGN KEY (id_covid_service) REFERENCES public.covid_service(id);


--
-- TOC entry 2970 (class 2606 OID 16580)
-- Name: twitter_service twitter_service_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.twitter_service
    ADD CONSTRAINT twitter_service_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- TOC entry 2971 (class 2606 OID 16585)
-- Name: views_video_youtube views_video_youtube_id_youtube_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.views_video_youtube
    ADD CONSTRAINT views_video_youtube_id_youtube_service_fkey FOREIGN KEY (id_youtube_service) REFERENCES public.youtube_service(id);


--
-- TOC entry 2972 (class 2606 OID 16590)
-- Name: weather_service weather_service_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.weather_service
    ADD CONSTRAINT weather_service_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- TOC entry 2973 (class 2606 OID 16595)
-- Name: youtube_service youtube_service_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.youtube_service
    ADD CONSTRAINT youtube_service_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


-- Completed on 2020-11-17 17:43:17 UTC

--
-- PostgreSQL database dump complete
--

