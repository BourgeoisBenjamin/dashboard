const express = require('express');
const app = express();
const port = process.env.SERVER_PORT

const pg = require('pg');
const pool = require('./services/postgresql')
const cors = require("cors");
const ms = require('ms');

const KEYS = require("./config/keys");

// set up cors to allow us to accept requests from our client
app.use(
    cors({
        origin: KEYS.SERVER.CLIENT_HOME_PAGE_URL, // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    })
);

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Hello world !!');
});

// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`));