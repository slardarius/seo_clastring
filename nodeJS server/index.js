const express = require('express');
const body_parser = require('body-parser');
const exect = require('executive');
const dbClient = require('./DataBase/mongoDB');
const statisticRoute = require('./routing/statistic');
const db =  new dbClient();


app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true}));
app.use('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, auth-token');
    next();
});
app.use(statisticRoute);

const PORT = 5000;

(async function onBootstrapServer() {
        try {
            await db.connection();
            app.listen(PORT, () => {
                console.log(`server running on port ${PORT}`)
            });
        }
        catch (e) {
            console.error(e);
        }
    })();


