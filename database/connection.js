const mongoose = require('mongoose');
const DB_URL = 'mongodb+srv://admin:adminadmin@ecom.d8tmrio.mongodb.net/?retryWrites=true&w=majority';

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