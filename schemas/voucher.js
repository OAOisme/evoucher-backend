const mongoose = require("mongoose");
const { Types } = require("mongoose")

const voucherSchema = new mongoose.Schema({
    name: {
        type: Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String
    },
    value: {
        type: Number
    },
    status: {
        type: String,
        enum: ['approved', 'processing', 'declined'],
        default: 'processing'

    },
    branch: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    approvedBy: {
        type: Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Voucher', voucherSchema)