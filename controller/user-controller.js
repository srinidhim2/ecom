const Joi = require('joi');
const { User } = require('../models/user')
const joi = require('joi');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const key = "123";
const { userAuth } = require('../middlewares/user-auth-middleware');

function getUsers(req, res, next) {
    res.json({ "message": "USERS API" })
}

function validateUserForReistration(user) {
    const schema = joi.object({
        name: joi.string().min(4).max(40).required(),
        email: joi.string().email().required(),
        password: joi.string().min(5).max(30).required(),
        repassword: joi.string().min(5).max(30).required(),
        phone: joi.string().min(10).max(12),
        isAdmin: joi.boolean(),
        active: joi.boolean()
    })
    const result = schema.validate(user);
    return result;
}

async function saveUser(req, res, next) {
    const result = validateUserForReistration(req.body);
    if (result.error) {
        //throw error
        res.status(400);
        return next(new Error(result.error.details[0].message));
    }

    const userData = result.value;
    if (userData.password != userData.repassword) {
        //throw error
        res.status(400);
        return next(new Error("password not matchig"));
    }

    //check user is unique
    let user = await User.isExist(userData.email);
    if (!user) {
        userData.password = passwordHash.generate(userData.password);
        user = await new User(userData).save();
        res.json({ user });
    } else {
        res.status(400);
        return next(new Error("Email is aldready registered"));
    }
}

function validateLoginCredentials(user) {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(5).max(30).required()
    })
    const result = schema.validate(user);
    return result;
}

function generateJWTtoken(user) {
    const payload = {
        _id: user._id,
        isAdmin: user.isAdmin,
        email: user.email
    }
    return jwt.sign({ payload }, key);
}
async function loginUser(req, res, next) {

    const result = validateLoginCredentials(req.body);
    if (result.error) {
        //throw error
        res.status(400);
        const error = new Error(result.error.details[0].message);
        return next(error);
    }

    const { email, password } = result.value;
    //authentication
    const user = await User.findOne({ email });

    if (user) {
        //password check
        const isPasswordMatched = passwordHash.verify(password, user.password);
        if (isPasswordMatched) {
            //login success

            const token = generateJWTtoken(user);
            return res.json({ message: "Login Success", token: token })
        }
    }

    res.status(400);
    const error = new Error("Email or passowrd invalid");
    return next(error);

}

async function updateUser(req, res, next) {
    //updating self info(normal user)
    //user is comming from userAuth
    const loggedInUser = req.session.user;
    //updateUser Here
    const schema = joi.object({
        phone: joi.string().min(10).max(12),
        name: joi.string().min(4).max(50),
    })
    const result = schema.validate(req.body);
    if (result.error) {
        return next(new Error(result.error.details[0].message));
    } else {
        const user = await User.findOneAndUpdate({ _id: loggedInUser._id }, { $set: result.value }, { $new: true });
        //OR
        // let user = await User.findById(payload_id);
        // user = Object.assign(user,result.value);
        // result = await user.save();
        if (!user) {
            return next(new Error('User not found'));
        }
        res.json({ user });

    }
}
async function updateUserById(req, res, next) {
    //updating as admin
    const user_id = req.params.user_id;
    let user = await User.findById(user_id);
    user = Object.assign(user, req.body);
    console.log(user);
    user = await user.save();
    res.json({ user });


}

module.exports = { getUsers, saveUser, loginUser, updateUser, updateUserById };