const debug = require('debug')('webpa:program');

class ProgramDB{
    constructor(channel){
        this.channel = channel;
    }
    prepare(){
        return new Promise((resolve, reject) => {
            if(this.collection){
                resolve(this.collection);
            }else{
                require('./mongodb').then(db => {
                    debug(`get for collection ${this.channel}`);
                    this.collection = db.collection(this.channel);
                    resolve(this.collection);
                }).catch(err => {
                    reject(err);
                });
            }
        });
    }
    sync(sessions){
        this.prepare().then((collection) => {
            const validIDs = [];
            for(let session in sessions){
                if(sessions.hasOwnProperty(session)) sessions[session].forEach((program, index) => {
                    const _id = program._id;
                    validIDs.push(_id);
                    delete program._id;
                    collection.update({_id}, {$set: {session, index, program}}, {upsert: true});
                });
            }
            collection.deleteMany({_id: {$nin: validIDs}});
        });
    }
    fetch(id){
        return new Promise((resolve, reject) => {
            this.prepare().then(collection => {
                collection.findOne({_id: id}).then(resolve).catch(reject);
            });
        });
    }
    all(search = {}){
        return new Promise((resolve, reject) => {
            this.prepare().then(collection => {
                collection.find(search).toArray().then(resolve).catch(reject);
            });
        });
    }
    update(id, control){
        this.prepare().then(collection => {
            collection.update({_id: id}, {$set: {control}});
        });
    }
}
module.exports = ProgramDB;