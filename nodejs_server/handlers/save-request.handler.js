module.exports = (req, res, customRequests) => {
    const words = {
        text: req.body.text,
        date: new Date().toString(),
    };
    customRequests.insertMany(words, (error, result) => {
        if (error) {
            onErrorHandler('Save words', error);
            res.status(500).send({
                success: -1,
                result: 'can\'t save wards in DB.'
            })
        }
        res.status('200').send({
            success: 0,
            result: result
        })
    });
}