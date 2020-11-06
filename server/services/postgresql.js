const pg = require('pg');
const KEYS = require("./../config/keys");

let pool;

const poolConfig = {
    user: KEYS.POSTGRESQL.DB_USER,
    host: KEYS.POSTGRESQL.DB_HOST,
    database: KEYS.POSTGRESQL.DB_NAME,
    password: KEYS.POSTGRESQL.DB_PASSWORD,
    port: KEYS.POSTGRESQL.DB_PORT,
    max: "40"
};

module.exports = {
    getPool: function () {
        if (pool) return pool; // if it is already there, grab it here
        pool = new pg.Pool(poolConfig);
        return pool;
    },
};