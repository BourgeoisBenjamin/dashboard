const router = require('express').Router();
const pool = require('../../../services/postgresql');
const KEYS = require('../../../config/keys');
const https = require('https');
const emailValidator = require('email-validator');
const cryptoRandomString = require('crypto-random-string');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require("nodemailer");

router.post('/lost', function(req, res) {

    let email = req.body.email;
    let username = req.body.username;

    if (!email || !username) {
        res.sendStatus(400);
        return;
    }
    // Removed trailing space
    email = email.trim();
    username = username.trim();

    if (!emailValidator.validate(email)) {
        res.sendStatus(400);
        return;
    }

    let uuid = uuidv4();

    pool.getPool().query("UPDATE users SET reset_password = $1 WHERE email = $2 AND username = $3 RETURNING email", [uuid, email, username], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"});
            return;
        } else if (result.rowCount === 0) {
            res.status(400)
            res.json({message: "User not found"});
            return;
        }

        let transporter = nodemailer.createTransport({
            host: KEYS.MAIL.SMTP,
            port: KEYS.MAIL.PORT,
            secure: true,
            auth: {
                user: KEYS.MAIL.EMAIL,
                pass: KEYS.MAIL.PASSWORD,
            },
        });

        let info = transporter.sendMail({
            from: '"Dashboard 👻" <' + KEYS.MAIL.EMAIL + '>',
            to: result.rows[0].email,
            subject: "✔ Reset link password",
            text: "Hello, here is your to to reset your password : " + KEYS.SERVER.CLIENT_HOME_PAGE_URL + "/reset-password?uuid=" + uuid, // plain text body
            html: "Hello,<br>Click <a href='" + KEYS.SERVER.CLIENT_HOME_PAGE_URL + "/reset-password?uuid=" + uuid + "'>here</a> to reset your password." +
                " Or, copy this link in your browser : " + KEYS.SERVER.CLIENT_HOME_PAGE_URL + "/reset-password?uuid=" + uuid +
                "<br>See you soon !", // html body
        });

        res.sendStatus(200);
    });
});

router.post('/reset', function(req, res) {

    let uuid_user = req.body.uuid;
    let password = req.body.password;

    if (!uuid_user || !password) {
        res.sendStatus(400);
        return;
    }
    // Removed trailing space
    uuid_user = uuid_user.trim();
    password = password.trim();

    pool.getPool().query("UPDATE users SET reset_password = null, password = crypt($2, gen_salt('bf')) WHERE reset_password = $1 RETURNING id", [uuid_user, password], (err, result) => {
        if (err) {
            res.status(503);
            res.json({message: "Service Unavailable"});
            return;
        } else if (result.rowCount === 0) {
            res.status(400)
            res.json({message: "User not found"});
            return;
        }
        res.sendStatus(200);
    });
});

module.exports = router;