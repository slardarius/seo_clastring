const axios = require('axios');
const env = require('../env');

module.exports = (req, res, customRequests) => {
    customRequests.find(undefined, async (err, result) => {
        const phrases = result.slice().map(x => x['text']);
        const {data: response} = await axios.post( env + '/api/v1/statistics/', {phrases: phrases.filter(Boolean)});
        console.log(response);
        res.status(200).send({
            success: 0,
            result: response,
        });
    });
};