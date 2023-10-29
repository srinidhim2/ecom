const express = require('express');
const app = express();

const morgan = require('morgan');

const handleErrors = require('./middlewares/error-handler');

const apiRouter = express.Router();
const { userRouter } = require('./routers/user-router');
const { orderRouter } = require('./routers/order-router');
const { productRouter } = require('./routers/product-router');
const { categoryRouter } = require('./routers/category-router');

//DB connection
const createConnection = require('./database/connection');

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

//Creating Server
app.listen(3000, () => console.log('Listening on port 3000'));

app.get('/', (req, res) => {
    res.json({ 'message': "Success" });
})

app.use(handleErrors);


const passwordHash = require('password-hash');

//Password Hash
// console.log("Inside index.js")
// const password = "12345";
// const hashedPassowrd = passwordHash.generate(password);
// console.log(hashedPassowrd);
// const isVlaid = passwordHash.verify(password, hashedPassowrd);
// console.log(isVlaid);