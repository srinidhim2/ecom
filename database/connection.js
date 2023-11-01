const mongoose = require('mongoose');
require("dotenv").config();
const { DB_URL } = process.env;

async function createConnection() {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB CONNECTED');
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = createConnection;