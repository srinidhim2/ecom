const express = require('express');
const userRouter = express.Router();

userRouter.get('', (req, res) => {
    res.json({ "message": "USER API" })
})

module.exports = { userRouter };