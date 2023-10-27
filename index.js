const express = require('express');
const app = express();

const morgan = require('morgan');

//MiddleWares
app.use(express.json());
app.use(morgan('tiny'));

//Creating Server
app.listen(3000, () => console.log('Listening on port 3000'));

app.get('/', (req, res) => {
    res.json({ 'message': "Success" });
})