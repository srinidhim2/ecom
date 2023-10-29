function handleErrors(err, req, res, next) {
    try {
        if (res.statusCode == 200) {
            res.status(500);
        }
        res.json({ error: err.message });
    } catch (err) {
        next();
    }
}

module.exports = handleErrors;