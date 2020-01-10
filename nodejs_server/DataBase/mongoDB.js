const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');


const DB_PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

class MongoCluster {
    constructor() {
        this.requestSchema = mongoose.Schema({
            text: String,
            date: { type: Date, default: new Date().toString() }
        });
    }
    connection() {
        return mongoose.connect('mongodb://' + DB_URL + DB_PORT + '/' + DB_NAME, { useNewUrlParser: true });
    }

    onGetSchema() {
        return mongoose.model('cluster', this.requestSchema, 'cluster');
    }
}
module.exports = MongoCluster;