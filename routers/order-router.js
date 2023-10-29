const express = require('express');
const { userAuthMiddleware } = require('../middlewares/user-auth-middleware')
const orderRouter = express.Router();
const { getOrders, placeOrder } = require('../controller/order-controller');

orderRouter.get('/', userAuthMiddleware, getOrders);
orderRouter.post('/', userAuthMiddleware, placeOrder);


module.exports = { orderRouter };