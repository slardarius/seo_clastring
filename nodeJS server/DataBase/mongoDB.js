const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/';
const DB_NAME = 'clusters';

class MongoCluster {
    constructor() {
        this.requestSchema = mongoose.Schema({
            text: String,
            date: { type: Date, default: new Date().toString() }
        });
    }
    connection() {
        return mongoose.connect(DB_URL + DB_NAME, { useNewUrlParser: true });
    }

    onGetSchema() {
        return mongoose.model('cluster', this.requestSchema, 'cluster');
    }
}
module.exports = MongoCluster;