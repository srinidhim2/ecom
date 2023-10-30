process.on('uncaughtException', (err) => {
    console.log("uncaughtException");
})
process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection');
})


function handleErrors(err, req, res, next) {
    try {
        if (res.statusCode == 200) {
            res.status(500);
        }
        res.json({ error: err.message || "something went wrong" });
    } catch (err) {
        next();
    }
}

module.exports = handleErrors;