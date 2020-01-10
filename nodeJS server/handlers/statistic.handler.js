const axios = require('axios');

module.exports = (req, res, customRequests) => {
    customRequests.find(undefined, async (err, result) => {
        const phrases = result.slice().map(x => x['text']);
        const {data: response} = await axios.post('http://127.0.0.1:4000/api/v1/statistics/', {phrases: phrases.filter(Boolean)});
        console.log(response);
        res.status(200).send({
            success: 0,
            result: response,
        });
    });
};