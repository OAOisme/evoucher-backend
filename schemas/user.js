const mongoose = require("mongoose");
const { Types } = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema)