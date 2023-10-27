const express = require('express');
const productRouter = express.Router();

productRouter.get('', (req, res) => {
    res.json({ "message": "PRODUCT API" })
})

module.exports = { productRouter };