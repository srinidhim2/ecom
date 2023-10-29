const express = require('express');
const categoryRouter = express.Router();
const { getCategories, createCategory } = require('../controller/category-controller');
const { adminAuthMiddleware } = require('../middlewares/user-auth-middleware');

categoryRouter.get('', getCategories);
categoryRouter.post('', adminAuthMiddleware, createCategory);

module.exports = { categoryRouter };