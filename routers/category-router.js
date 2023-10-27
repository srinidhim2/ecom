const express = require('express');
const categoryRouter = express.Router();

categoryRouter.get('', (req, res) => {
    res.json({ "message": "CATEGORY API" })
})

module.exports = { categoryRouter };