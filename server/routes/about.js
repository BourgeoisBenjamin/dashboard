const router = require('express').Router();

// about.json file
router.get('/about.json', function(req, res) {

    const client_ip = {host: req.ip}
    const services = []
    const server = {};

    services.push({name: 'weather', widgets: [
            {
                name: 'city_temperature'
            }
        ]})


    server.customer = client_ip
    server.server = {current_time: Date.now(), services: services}



    res.status(200)
    res.json(server);
});

module.exports = router;