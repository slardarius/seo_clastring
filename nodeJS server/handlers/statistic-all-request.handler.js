function onGetInfoByCount(count = 20, page = 1, information) {
    if (information.length >= count) {
        if (Number(page) === 1) {
            return information.slice(0, count)
        } else {
            const start = (page - 1) !== 0 ? (page - 1) * count : 0;
            const end = page * count;
            return information.slice(start, end);
        }
    } else {
        return information;
    }
}

module.exports = (req, res, customRequests) => {
    const count_info = req.query.count;
    const page = req.query.page;
    customRequests.find(undefined, (error, result) => {
        if (error) {
            res.status(500).send({
                success: -1,
                result: 'Can\'t returns cors.'
            });
        }
        res.status(200).send({
            success: 0,
            result: {
                count: result.length,
                core: onGetInfoByCount(count_info, page, result)
            }
        });
    });
}