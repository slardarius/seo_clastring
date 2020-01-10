const googleTrends = require('google-trends-api');
const axios = require('axios');
const env = require('../env');


module.exports = (req, res) => {
    googleTrends.dailyTrends({
        geo: 'RU',
    }, async (err, result) => {
        searches = JSON.parse(result);
        listOfPhrases = searches['default']['trendingSearchesDays'].map(trend => trend['trendingSearches'].map(search => search['title']['query']));
        phrases = [];
        listOfPhrases.forEach(element => {
            phrases.push(...element);
        });
        try {
            const response = await axios.post(env + '/api/v1/statistics/', {phrases: phrases});
            res.status(200).send({
                success: 0,
                result: response,
            })
            
        } catch (e) {
            console.error(e);
            res.status(500).send({
                success: 1,
                message: e,
            });
        }
    });
}