const express = require('express'),
    debug = require('debug')('program-store:program'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs');

const STORAGE = path.join(__dirname, '../', 'storage');

debug(`Storage path: ${STORAGE}`);

router.get('/:channel', function(req, res) {
    const channel = req.params.channel || 'default';
    fs.readFile(path.join(STORAGE, `${channel}.json`), (err, data) => {
        if(err){
            debug(`Error getting program from ${channel}`, err);
            res.end(null);
        }else{
            debug(`Get program from ${channel}`, data);
            res.end(data);
        }
    });
});

router.post('/:channel', function(req, res) {
    const channel = req.params.channel || 'default', json = req.body;
    debug(`Save programs to ${channel}`, json);
    fs.writeFile(path.join(STORAGE, `${channel}.json`), JSON.stringify(json), () => {
        res.end('ACK');
    });
});

module.exports = router;
