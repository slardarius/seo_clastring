const googleTrends = require('google-trends-api');
const axios = require('axios');
const env = require('../env');

class Cluster {
    constructor() {
        this.currentListOfPhrases = [];
    }

    onGetClusters(req, res, customRequests) {
        try {
            const mock_data = JSON.parse(req.query['mock']);
            let query_string = undefined;
            let date_from = undefined;
            let date_to = undefined;
            const count_cluster = req.query['count_cluster'];
            console.log(mock_data);
            if (mock_data) {
                query_string = req.query['query_string'];
                date_from = req.query['date_from'];
                date_to = req.query['date_to'];
                //
                googleTrends.relatedQueries({ keyword: (query_string || 'Украина'), startTime: new Date(date_from), endTime: new Date(date_to) })
                .then(async (results) => {
                    const listOfPhrases = [];
                    JSON.parse(results)['default']['rankedList'].forEach(item => {
                        item['rankedKeyword'].forEach(history => {
                            listOfPhrases.push(history.query);
                        });
                    });
                    this.currentListOfPhrases = listOfPhrases;
                    const {data: response} = await axios.post(env + '/api/v1/statistics/k_means', { phrases: listOfPhrases.filter(Boolean), count_cluster, });
                    res.status(200).send({
                        success: 0,
                        result: {
                            clustered_data: response['responce'],
                            phrases: listOfPhrases,
                        },
                    });
                })
            } else {
                console.log('HERE');
                customRequests.find(undefined, async (error, result) => {
                    if (error) {
                        res.status(500).send({
                            success: -1,
                            result: 'Can\'t returns cors.'
                        });
                    }
                    const listOfPhrases = result.slice().map(phrase => phrase.text);
                    this.currentListOfPhrases = listOfPhrases;
                    const {data: response} = await axios.post(env + '/api/v1/statistics/k_means', { phrases: listOfPhrases.filter(Boolean), count_cluster, });
                    res.status(200).send({
                        success: 0,
                        result: {
                            clustered_data: response['responce'],
                            phrases: listOfPhrases,
                        },
                    });
                });
            }
        } catch (e) {
            console.error(e);
            res.status(500).send({ success: 1, message: e });
        }
    }

    async onGetClusterEvaluation(req, res) {
        if (this.currentListOfPhrases.length) {
            const range = req.query['range'];
            const {data: response} = await axios.post(env + '/api/v1/statistics/criterion', { range: +range+1 || 8, phrases: this.currentListOfPhrases.filter(Boolean), });
            res.status(200).send({
                success: 0,
                result: response,
            });
        } else {
            res.status(404).send({
                success: 1,
                result: 'Can\'t сriterion',
            });
        }
    }
}

module.exports = Cluster;