const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: ture
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: ture,
        unique: true
    },
    password: {
        type: String,
        required: ture
    },
    active: { type: Boolean, required: true, default: false },
    phone: { type: String }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const User = mongoose.model('user', userSchema);;

module.exports = { User }