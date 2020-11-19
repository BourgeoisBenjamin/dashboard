const router = require('express').Router();
const aboutFile = require('../config/about.json')
const fs = require('fs');

// about.json file
router.get('/about.json', function(req, res) {

    aboutFile.customer.host = req.ip;
    aboutFile.server.current_time = Date.now();

    res.status(200)
    res.json(aboutFile);
});

module.exports = router;