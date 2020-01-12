const { Router } = require('express');
const router = Router();
//
const clusterClass = require('../handlers/kmeans-clusterisation.handler');
// HANDLERS
const statisticGeoHandler = require('../handlers/statics-geo.handler');
const statisticHandler = require('../handlers/statistic.handler');
const statisticAllRequestsHandler = require('../handlers/statistic-all-request.handler');
const saveRequestHandler = require('../handlers/save-request.handler');
const clusterHandler = new clusterClass();
//
const MongoCluster = require('../DataBase/mongoDB');
const customRequests = new MongoCluster().onGetSchema();

/* ROUTING */
router.get('/api/v1/statistics_geo', statisticGeoHandler);
router.get('/api/v1/statistics', (req, res) => statisticHandler(req, res, customRequests));
router.get('/api/v1/get_all_request', (req, res) => statisticAllRequestsHandler(req, res, customRequests));
router.post('/api/v1/save_request', (req, res) => saveRequestHandler(req, res, customRequests));
router.get('/api/v1/k_means_cluster', (req, res) => clusterHandler.onGetClusters(req, res, customRequests));
router.get('/api/v1/k_means_criterion', (req, res) => clusterHandler.onGetClusterEvaluation(req, res));


module.exports = router;
