const { Category } = require("../models/category");
const joi = require('joi');

async function getCategories(req, res) {
    // res.json({ "message": "CATEGORY API" })
    const categories = await Category.find();
    res.json({ categories });
}

async function createCategory(req, res, next) {
    const schema = joi.object({
        name: joi.string().min(3).max(20).required()
    })
    const validateResult = schema.validate(req.body);
    if (!validateResult.error) {
        const name = validateResult.value.name;
        const category = new Category({
            name: name
        })
        const result = await category.save();
        return res.json({ result });
    }
    const err = new Error(validateResult.error.details[0].message);
    return next(err);
}

module.exports = { getCategories, createCategory };