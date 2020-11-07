const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.SERVER_PORT

const pg = require('pg');
const pool = require('./services/postgresql')
const cors = require("cors");
const ms = require('ms');

const KEYS = require("./config/keys");

const accountRoutes = require("./routes/account/account-routes");
//const accountPasswordRoutes = require("./routes/account/password/account-password-routes");
//const accountServiceRoutes = require("./routes/account/service/account-service-routes");

app.use(bodyParser());

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
//app.use("/account/password", accountPasswordRoutes);
//app.use("/account/service", accountServiceRoutes);

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Hello world !!');
});

// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`));