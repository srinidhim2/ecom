const express = require('express');
const handleErrors = require('./middlewares/error-handler');

const app = express();
//env var config
require('dotenv').config();
require('express-async-errors');

const morgan = require('morgan');



const apiRouter = express.Router();
const { userRouter } = require('./routers/user-router');
const { orderRouter } = require('./routers/order-router');
const { productRouter } = require('./routers/product-router');
const { categoryRouter } = require('./routers/category-router');
const { cartRouter } = require('./routers/cart-router');

//Creating Server


//DB connection
const createConnection = require('./database/connection');
const { UPLOAD_FOLDER } = process.env;

createConnection();

//MiddleWares

app.use(express.json());
app.use(morgan('tiny'));

//ROUTERS


apiRouter.get('', (req, res) => { res.json({ "message": "API is WORKING" }) })
app.use('/api', apiRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/orders', orderRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/cart', cartRouter);

//serving image (keep it last)
apiRouter.get("/" + UPLOAD_FOLDER + "/*", (req, res, next) => {
    const path = req.url;
    const filePath = `${__dirname}${path}`;
    res.sendFile(filePath, (err) => {
        next();
    });
});


app.use(handleErrors);

module.exports = { app };