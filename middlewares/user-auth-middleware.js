const jwt = require('jsonwebtoken');
const key = "123";

function userAuthMiddleware(req, res, next) {
    try {
        let token = null;
        token = req.headers.authorization;
        token = token.split(' ')[1];
        console.log(token);
        const payload = jwt.verify(token, key);
        console.log(payload);

        const session = req.session;
        req.session = {
            user: payload.payload
        };
        next();

    } catch (err) {

        res.status(401);
        return res.json({ "error": "Ivalid token" });
    }

}

function adminAuthMiddleware(req, res, next) {
    try {
        let token = null;
        token = req.headers.authorization;
        token = token.split(' ')[1];
        console.log(token);
        const payload = jwt.verify(token, key);
        console.log(payload);

        req.session = {
            user: payload.payload
        };
        if (payload.payload.isAdmin) {
            return next();
        }
        res.status(401);
        res.json({ "error": "You are not authorized to access" })

    } catch (err) {
        res.status(401);
        return res.json({ "error": "Ivalid token" });
    }

}


module.exports = { userAuthMiddleware, adminAuthMiddleware };