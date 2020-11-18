const router = require('express').Router();

// about.json file
router.get('/about.json', function(req, res) {
    const client_ip = {host: req.ip}
    const current_time = {current_time: Date.now()}
    const server = [];
    server.push()

    res.status(200)
    res.json({customer: client_ip, server:(current_time)});
});

module.exports = router;