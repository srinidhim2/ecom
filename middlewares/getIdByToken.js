const jwt = require('jsonwebtoken');
const JWT_KEY = "Bnm_ou#%";

function getUserIdByToken(rha) {
    let token = null;
    token = rha;
    token = token.split(' ')[1];
    const payload = jwt.verify(token, JWT_KEY);

    const user = payload.payload._id;
    return user;
}

module.exports = { getUserIdByToken };