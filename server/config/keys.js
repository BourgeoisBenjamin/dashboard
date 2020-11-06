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

// OTHERS
const SERVER = {
    CLIENT_HOME_PAGE_URL: process.env.CLIENT_HOME_PAGE_URL
};

// KEYS PACKAGE
const KEYS = {
    POSTGRESQL,
    SERVER
};

module.exports = KEYS;