const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');


const DB_URL = process.env.DB_URL;

class MongoCluster {
    constructor() {
        this.requestSchema = mongoose.Schema({
            text: String,
            date: { type: Date, default: new Date().toString() }
        });
    }
    connection() {
        return mongoose.connect(DB_URL, { useNewUrlParser: true });
    }

    onGetSchema() {
        return mongoose.model('cluster', this.requestSchema, 'cluster');
    }
}
module.exports = MongoCluster;
