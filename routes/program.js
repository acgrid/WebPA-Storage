const express = require('express'),
    debug = require('debug')('program-store:program'),
    router = express.Router(),
    Program = require('../lib/program');

router.get('/:channel/:id?', function(req, res) {
    const channel = req.params.channel || 'default', _id = req.params.id;
    const service = new Program(channel);
    (_id ? service.fetch(_id) : service.all()).then(data => {
        res.json(data);
        debug(`Get program from ${channel}`, data);
    }).catch(err => {
        debug(`Error getting program from ${channel}`, err);
        res.json(null);
    });
});

router.post('/:channel', function(req, res) {
    const channel = req.params.channel || 'default', service = new Program(channel);
    service.sync(req.body);
    res.end('ACK');
});

router.patch('/:channel/:id', function(req, res) {
    const channel = req.params.channel || 'default', id = req.params.id, service = new Program(channel);
    if(id) service.update(id, req.body);
    res.end('ACK');
});

module.exports = router;
