const mongoose = require('mongoose');
const DB_URL = "mongodb://localhost:27017/ecomm";

async function createConnection() {

    const connection = await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    if (connection) {
        console.log("DB CONNECTED");
    }

}

module.exports = createConnection;