const express = require('express');
const orderRouter = express.Router();

orderRouter.get('', (req, res) => {
    res.json({ "message": "ORDER API" })
})

module.exports = { orderRouter };