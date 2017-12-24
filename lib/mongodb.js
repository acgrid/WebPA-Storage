const MongoClient = require('mongodb').MongoClient,
    config = require('config').get('mongo');

module.exports = MongoClient.connect(config.dsn).then(client => {
    return new Promise((resolve) => {
        resolve(client.db(config.db));
    });
});