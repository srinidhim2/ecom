const express = require('express');
const userRouter = express.Router();
const { getUsers } = require('../controller/user-controller');
const { get } = require('mongoose');

userRouter.get('', getUsers);

module.exports = { userRouter };