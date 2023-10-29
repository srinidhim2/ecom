const joi = require('joi');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const { Order } = require('../models/order');
const { Product } = require("../models/product");
const { getUserIdByToken } = require('../middlewares/getIdByToken');


async function getOrders(req, res, next) {
    try {
        const user = getUserIdByToken(req.headers.authorization);
        const orders = await Order.find({ user: user }).populate('cart');
        res.json(orders);
    } catch (err) {
        return next(err);
    }
}



//product,user,address,quantity
async function placeOrder(req, res, next) {
    const user = getUserIdByToken(req.headers.authorization);

    console.log(req.body);
    const schema = joi.object({
        cart: joi.string().required(),
        address: joi.string().required(),
        paymentType: joi.string().required(),
        status: joi.string()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return next(new Error(result.error.details[0].message));
    }

    const order = result.value;
    order.user = user;
    const orderResult = await new Order(order).save();
    // const saveResult = await Order.create(orders);
    // res.json({ orders: saveResult });
    res.json(orderResult);
}

module.exports = { getOrders, placeOrder };