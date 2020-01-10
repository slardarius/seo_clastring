const googleTrends = require('google-trends-api');
const axios = require('axios');

class Cluster {
    constructor() {
        this.currentListOfPhrases = [];
    }

    onGetClusters(req, res) {
        try {
            const query_string = req.query['query_string'];
            const count_cluster = req.query['count_cluster'];
            const date_from = req.query['date_from'];
            const date_to = req.query['date_to'];
            googleTrends.relatedQueries({ keyword: (query_string || 'Украина'), startTime: new Date(date_from), endTime: new Date(date_to) })
                .then(async (results) => {
                    const listOfPhrases = [];
                    JSON.parse(results)['default']['rankedList'].forEach(item => {
                        item['rankedKeyword'].forEach(history => {
                            listOfPhrases.push(history.query);
                        });
                    });
                    this.currentListOfPhrases = listOfPhrases;
                    const {data: response} = await axios.post('http://127.0.0.1:4000/api/v1/statistics/k_means', { phrases: listOfPhrases.filter(Boolean), count_cluster, });
                    console.log(response);
                    res.status(200).send({
                        success: 0,
                        result: {
                            clustered_data: response['responce'],
                            phrases: listOfPhrases,
                        },
                    });
                })
        } catch (e) {
            console.error(e);
            res.status(500).send({ success: 1, message: e });
        }
    }

    async onGetClusterEvaluation(req, res) {
        if (this.currentListOfPhrases.length) {
            const range = req.query['range'];
            const {data: response} = await axios.post('http://127.0.0.1:4000/api/v1/statistics/criterion', { range: +range+1 || 8, phrases: this.currentListOfPhrases.filter(Boolean), });
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