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

const accountRoutes = require("./routes/account/account-routes");
const loginTiersRoutes = require("./routes/account/login/tiers/tiers-routes");
//const accountPasswordRoutes = require("./routes/account/password/account-password-routes");
const accountServiceRoutes = require("./routes/account/service/account-service-routes");

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
app.use("/account", accountRoutes);
app.use("/account/login/tiers", loginTiersRoutes);
//app.use("/account/password", accountPasswordRoutes);
app.use("/account/service", accountServiceRoutes);

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Hello world !!');
});

// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`));