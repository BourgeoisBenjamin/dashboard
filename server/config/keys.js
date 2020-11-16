// POSTGRES CONFIG
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const POSTGRESQL = {
    DB_HOST: DB_HOST,
    DB_PORT: DB_PORT,
    DB_NAME: DB_NAME,
    DB_USER: DB_USER,
    DB_PASSWORD: DB_PASSWORD,
    POSTGRESQL_URI: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
};

const TWITTER_APP = {
    APP_API_KEY: process.env.TWITTER_APP_API_KEY,
    APP_API_KEY_SECRET: process.env.TWITTER_APP_API_KEY_SECRET,
    APP_API_CALLBACK: process.env.TWITTER_APP_API_CALLBACK
}

// OTHERS
const SERVER = {
    CLIENT_HOME_PAGE_URL: process.env.CLIENT_HOME_PAGE_URL
};

const JWT = {
    JWT_SECRET: process.env.JWT_TOKEN_SECRET
};

const SESSION = {
    SESSION_KEY: process.env.SESSION_KEY,
    TABLE_NAME: process.env.SESSION_TABLE_NAME
}

// KEYS PACKAGE
const KEYS = {
    POSTGRESQL,
    SERVER,
    JWT,
    TWITTER_APP,
    SESSION
};

module.exports = KEYS;