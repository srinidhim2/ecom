const mongoose = require('mongoose');
const { DB_URL } = process.env;


async function createConnection() {

    try {
        const connection = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(x => console.log("DB CONNECTED"));
    } catch (err) {
        console.error(err.message);
    }

}

module.exports = createConnection;