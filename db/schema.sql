--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Debian 12.4-1.pgdg100+1)
-- Dumped by pg_dump version 12.4

-- Started on 2020-11-16 10:05:33 UTC

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16385)
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
-- TOC entry 203 (class 1259 OID 16388)
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
-- TOC entry 3060 (class 0 OID 0)
-- Dependencies: 203
-- Name: channels_videos_youtube_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.channels_videos_youtube_id_seq OWNED BY public.channels_videos_youtube.id;


--
-- TOC entry 204 (class 1259 OID 16390)
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
-- TOC entry 205 (class 1259 OID 16396)
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
-- TOC entry 3061 (class 0 OID 0)
-- Dependencies: 205
-- Name: city_meteo_weather_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.city_meteo_weather_id_seq OWNED BY public.city_meteo_weather.id;


--
-- TOC entry 206 (class 1259 OID 16398)
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
-- TOC entry 207 (class 1259 OID 16401)
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
-- TOC entry 3062 (class 0 OID 0)
-- Dependencies: 207
-- Name: comments_video_youtube_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.comments_video_youtube_id_seq OWNED BY public.comments_video_youtube.id;


--
-- TOC entry 208 (class 1259 OID 16403)
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
-- TOC entry 209 (class 1259 OID 16409)
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
-- TOC entry 3063 (class 0 OID 0)
-- Dependencies: 209
-- Name: country_case_covid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.country_case_covid_id_seq OWNED BY public.country_case_covid.id;


--
-- TOC entry 210 (class 1259 OID 16411)
-- Name: covid_service; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.covid_service (
    id bigint NOT NULL,
    id_user bigint NOT NULL
);


ALTER TABLE public.covid_service OWNER TO dashboard;

--
-- TOC entry 211 (class 1259 OID 16414)
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
-- TOC entry 3064 (class 0 OID 0)
-- Dependencies: 211
-- Name: covid_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.covid_service_id_seq OWNED BY public.covid_service.id;


--
-- TOC entry 212 (class 1259 OID 16416)
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
-- TOC entry 213 (class 1259 OID 16419)
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
-- TOC entry 3065 (class 0 OID 0)
-- Dependencies: 213
-- Name: last_tweets_twitter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.last_tweets_twitter_id_seq OWNED BY public.last_tweets_twitter.id;


--
-- TOC entry 214 (class 1259 OID 16421)
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
-- TOC entry 215 (class 1259 OID 16427)
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
-- TOC entry 3066 (class 0 OID 0)
-- Dependencies: 215
-- Name: search_tweets_twitter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.search_tweets_twitter_id_seq OWNED BY public.search_tweets_twitter.id;


--
-- TOC entry 216 (class 1259 OID 16429)
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
-- TOC entry 217 (class 1259 OID 16432)
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
-- TOC entry 3067 (class 0 OID 0)
-- Dependencies: 217
-- Name: subscribers_channels_youtube_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.subscribers_channels_youtube_id_seq OWNED BY public.subscribers_channels_youtube.id;


--
-- TOC entry 218 (class 1259 OID 16434)
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
-- TOC entry 219 (class 1259 OID 16440)
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
-- TOC entry 3068 (class 0 OID 0)
-- Dependencies: 219
-- Name: summary_country_covid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.summary_country_covid_id_seq OWNED BY public.summary_country_covid.id;


--
-- TOC entry 220 (class 1259 OID 16442)
-- Name: twitter_service; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.twitter_service (
    id bigint NOT NULL,
    id_user bigint NOT NULL
);


ALTER TABLE public.twitter_service OWNER TO dashboard;

--
-- TOC entry 221 (class 1259 OID 16445)
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
-- TOC entry 3069 (class 0 OID 0)
-- Dependencies: 221
-- Name: twitter_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.twitter_service_id_seq OWNED BY public.twitter_service.id;


--
-- TOC entry 222 (class 1259 OID 16447)
-- Name: users; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying,
    password character varying,
    email character varying,
    activate_email boolean NOT NULL,
    user_token character varying,
    user_tokensecret character varying
);


ALTER TABLE public.users OWNER TO dashboard;

--
-- TOC entry 223 (class 1259 OID 16453)
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
-- TOC entry 3070 (class 0 OID 0)
-- Dependencies: 223
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 224 (class 1259 OID 16455)
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
-- TOC entry 225 (class 1259 OID 16458)
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
-- TOC entry 3071 (class 0 OID 0)
-- Dependencies: 225
-- Name: views_video_youtube_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.views_video_youtube_id_seq OWNED BY public.views_video_youtube.id;


--
-- TOC entry 226 (class 1259 OID 16460)
-- Name: weather_service; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.weather_service (
    id bigint NOT NULL,
    id_user bigint NOT NULL
);


ALTER TABLE public.weather_service OWNER TO dashboard;

--
-- TOC entry 227 (class 1259 OID 16463)
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
-- TOC entry 3072 (class 0 OID 0)
-- Dependencies: 227
-- Name: weather_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.weather_service_id_seq OWNED BY public.weather_service.id;


--
-- TOC entry 228 (class 1259 OID 16465)
-- Name: youtube_service; Type: TABLE; Schema: public; Owner: dashboard
--

CREATE TABLE public.youtube_service (
    id bigint NOT NULL,
    id_user bigint NOT NULL
);


ALTER TABLE public.youtube_service OWNER TO dashboard;

--
-- TOC entry 229 (class 1259 OID 16468)
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
-- TOC entry 3073 (class 0 OID 0)
-- Dependencies: 229
-- Name: youtube_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dashboard
--

ALTER SEQUENCE public.youtube_service_id_seq OWNED BY public.youtube_service.id;


--
-- TOC entry 2860 (class 2604 OID 16470)
-- Name: channels_videos_youtube id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.channels_videos_youtube ALTER COLUMN id SET DEFAULT nextval('public.channels_videos_youtube_id_seq'::regclass);


--
-- TOC entry 2861 (class 2604 OID 16471)
-- Name: city_meteo_weather id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.city_meteo_weather ALTER COLUMN id SET DEFAULT nextval('public.city_meteo_weather_id_seq'::regclass);


--
-- TOC entry 2862 (class 2604 OID 16472)
-- Name: comments_video_youtube id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.comments_video_youtube ALTER COLUMN id SET DEFAULT nextval('public.comments_video_youtube_id_seq'::regclass);


--
-- TOC entry 2863 (class 2604 OID 16473)
-- Name: country_case_covid id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.country_case_covid ALTER COLUMN id SET DEFAULT nextval('public.country_case_covid_id_seq'::regclass);


--
-- TOC entry 2864 (class 2604 OID 16474)
-- Name: covid_service id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.covid_service ALTER COLUMN id SET DEFAULT nextval('public.covid_service_id_seq'::regclass);


--
-- TOC entry 2865 (class 2604 OID 16475)
-- Name: last_tweets_twitter id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.last_tweets_twitter ALTER COLUMN id SET DEFAULT nextval('public.last_tweets_twitter_id_seq'::regclass);


--
-- TOC entry 2866 (class 2604 OID 16476)
-- Name: search_tweets_twitter id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.search_tweets_twitter ALTER COLUMN id SET DEFAULT nextval('public.search_tweets_twitter_id_seq'::regclass);


--
-- TOC entry 2867 (class 2604 OID 16477)
-- Name: subscribers_channels_youtube id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.subscribers_channels_youtube ALTER COLUMN id SET DEFAULT nextval('public.subscribers_channels_youtube_id_seq'::regclass);


--
-- TOC entry 2868 (class 2604 OID 16478)
-- Name: summary_country_covid id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.summary_country_covid ALTER COLUMN id SET DEFAULT nextval('public.summary_country_covid_id_seq'::regclass);


--
-- TOC entry 2869 (class 2604 OID 16479)
-- Name: twitter_service id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.twitter_service ALTER COLUMN id SET DEFAULT nextval('public.twitter_service_id_seq'::regclass);


--
-- TOC entry 2870 (class 2604 OID 16480)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2871 (class 2604 OID 16481)
-- Name: views_video_youtube id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.views_video_youtube ALTER COLUMN id SET DEFAULT nextval('public.views_video_youtube_id_seq'::regclass);


--
-- TOC entry 2872 (class 2604 OID 16482)
-- Name: weather_service id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.weather_service ALTER COLUMN id SET DEFAULT nextval('public.weather_service_id_seq'::regclass);


--
-- TOC entry 2873 (class 2604 OID 16483)
-- Name: youtube_service id; Type: DEFAULT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.youtube_service ALTER COLUMN id SET DEFAULT nextval('public.youtube_service_id_seq'::regclass);


--
-- TOC entry 2875 (class 2606 OID 16485)
-- Name: channels_videos_youtube channels_videos_youtube_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.channels_videos_youtube
    ADD CONSTRAINT channels_videos_youtube_pkey PRIMARY KEY (id);


--
-- TOC entry 2877 (class 2606 OID 16487)
-- Name: city_meteo_weather city_meteo_weather_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.city_meteo_weather
    ADD CONSTRAINT city_meteo_weather_pkey PRIMARY KEY (id);


--
-- TOC entry 2879 (class 2606 OID 16489)
-- Name: comments_video_youtube comments_video_youtube_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.comments_video_youtube
    ADD CONSTRAINT comments_video_youtube_pkey PRIMARY KEY (id);


--
-- TOC entry 2881 (class 2606 OID 16491)
-- Name: country_case_covid country_case_covid_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.country_case_covid
    ADD CONSTRAINT country_case_covid_pkey PRIMARY KEY (id);


--
-- TOC entry 2883 (class 2606 OID 16493)
-- Name: covid_service covid_service_id_user_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.covid_service
    ADD CONSTRAINT covid_service_id_user_key UNIQUE (id_user);


--
-- TOC entry 2885 (class 2606 OID 16495)
-- Name: covid_service covid_service_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.covid_service
    ADD CONSTRAINT covid_service_pkey PRIMARY KEY (id);


--
-- TOC entry 2887 (class 2606 OID 16497)
-- Name: last_tweets_twitter last_tweets_twitter_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.last_tweets_twitter
    ADD CONSTRAINT last_tweets_twitter_pkey PRIMARY KEY (id);


--
-- TOC entry 2889 (class 2606 OID 16499)
-- Name: search_tweets_twitter search_tweets_twitter_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.search_tweets_twitter
    ADD CONSTRAINT search_tweets_twitter_pkey PRIMARY KEY (id);


--
-- TOC entry 2891 (class 2606 OID 16501)
-- Name: subscribers_channels_youtube subscribers_channels_youtube_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.subscribers_channels_youtube
    ADD CONSTRAINT subscribers_channels_youtube_pkey PRIMARY KEY (id);


--
-- TOC entry 2893 (class 2606 OID 16503)
-- Name: summary_country_covid summary_country_covid_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.summary_country_covid
    ADD CONSTRAINT summary_country_covid_pkey PRIMARY KEY (id);


--
-- TOC entry 2895 (class 2606 OID 16505)
-- Name: twitter_service twitter_service_id_user_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.twitter_service
    ADD CONSTRAINT twitter_service_id_user_key UNIQUE (id_user);


--
-- TOC entry 2897 (class 2606 OID 16507)
-- Name: twitter_service twitter_service_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.twitter_service
    ADD CONSTRAINT twitter_service_pkey PRIMARY KEY (id);


--
-- TOC entry 2899 (class 2606 OID 16509)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2901 (class 2606 OID 16511)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2903 (class 2606 OID 16591)
-- Name: users users_user_token; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_token UNIQUE (user_token);


--
-- TOC entry 2905 (class 2606 OID 16513)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 2907 (class 2606 OID 16515)
-- Name: views_video_youtube views_video_youtube_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.views_video_youtube
    ADD CONSTRAINT views_video_youtube_pkey PRIMARY KEY (id);


--
-- TOC entry 2909 (class 2606 OID 16517)
-- Name: weather_service weather_service_id_user_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.weather_service
    ADD CONSTRAINT weather_service_id_user_key UNIQUE (id_user);


--
-- TOC entry 2911 (class 2606 OID 16519)
-- Name: weather_service weather_service_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.weather_service
    ADD CONSTRAINT weather_service_pkey PRIMARY KEY (id);


--
-- TOC entry 2913 (class 2606 OID 16521)
-- Name: youtube_service youtube_service_id_user_key; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.youtube_service
    ADD CONSTRAINT youtube_service_id_user_key UNIQUE (id_user);


--
-- TOC entry 2915 (class 2606 OID 16523)
-- Name: youtube_service youtube_service_pkey; Type: CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.youtube_service
    ADD CONSTRAINT youtube_service_pkey PRIMARY KEY (id);


--
-- TOC entry 2916 (class 2606 OID 16524)
-- Name: channels_videos_youtube channels_videos_youtube_id_youtube_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.channels_videos_youtube
    ADD CONSTRAINT channels_videos_youtube_id_youtube_service_fkey FOREIGN KEY (id_youtube_service) REFERENCES public.youtube_service(id);


--
-- TOC entry 2917 (class 2606 OID 16529)
-- Name: city_meteo_weather city_meteo_weather_id_weather_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.city_meteo_weather
    ADD CONSTRAINT city_meteo_weather_id_weather_service_fkey FOREIGN KEY (id_weather_service) REFERENCES public.weather_service(id);


--
-- TOC entry 2918 (class 2606 OID 16534)
-- Name: comments_video_youtube comments_video_youtube_id_youtube_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.comments_video_youtube
    ADD CONSTRAINT comments_video_youtube_id_youtube_service_fkey FOREIGN KEY (id_youtube_service) REFERENCES public.youtube_service(id);


--
-- TOC entry 2919 (class 2606 OID 16539)
-- Name: country_case_covid country_case_covid_id_covid_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.country_case_covid
    ADD CONSTRAINT country_case_covid_id_covid_service_fkey FOREIGN KEY (id_covid_service) REFERENCES public.covid_service(id);


--
-- TOC entry 2920 (class 2606 OID 16544)
-- Name: covid_service covid_service_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.covid_service
    ADD CONSTRAINT covid_service_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- TOC entry 2921 (class 2606 OID 16549)
-- Name: last_tweets_twitter last_tweets_twitter_id_twitter_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.last_tweets_twitter
    ADD CONSTRAINT last_tweets_twitter_id_twitter_service_fkey FOREIGN KEY (id_twitter_service) REFERENCES public.twitter_service(id);


--
-- TOC entry 2922 (class 2606 OID 16554)
-- Name: search_tweets_twitter search_tweets_twitter_id_twitter_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.search_tweets_twitter
    ADD CONSTRAINT search_tweets_twitter_id_twitter_service_fkey FOREIGN KEY (id_twitter_service) REFERENCES public.twitter_service(id);


--
-- TOC entry 2923 (class 2606 OID 16559)
-- Name: subscribers_channels_youtube subscribers_channels_youtube_id_youtube_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.subscribers_channels_youtube
    ADD CONSTRAINT subscribers_channels_youtube_id_youtube_service_fkey FOREIGN KEY (id_youtube_service) REFERENCES public.youtube_service(id);


--
-- TOC entry 2924 (class 2606 OID 16564)
-- Name: summary_country_covid summary_country_covid_id_covid_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.summary_country_covid
    ADD CONSTRAINT summary_country_covid_id_covid_service_fkey FOREIGN KEY (id_covid_service) REFERENCES public.covid_service(id);


--
-- TOC entry 2925 (class 2606 OID 16569)
-- Name: twitter_service twitter_service_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.twitter_service
    ADD CONSTRAINT twitter_service_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- TOC entry 2926 (class 2606 OID 16574)
-- Name: views_video_youtube views_video_youtube_id_youtube_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.views_video_youtube
    ADD CONSTRAINT views_video_youtube_id_youtube_service_fkey FOREIGN KEY (id_youtube_service) REFERENCES public.youtube_service(id);


--
-- TOC entry 2927 (class 2606 OID 16579)
-- Name: weather_service weather_service_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.weather_service
    ADD CONSTRAINT weather_service_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- TOC entry 2928 (class 2606 OID 16584)
-- Name: youtube_service youtube_service_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dashboard
--

ALTER TABLE ONLY public.youtube_service
    ADD CONSTRAINT youtube_service_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


-- Completed on 2020-11-16 10:05:33 UTC

--
-- PostgreSQL database dump complete
--

