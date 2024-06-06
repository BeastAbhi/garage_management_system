const mongoose = require('mongoose')

const billItemSchema = new mongoose.Schema({
    itemName:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})

const BillSchema = new mongoose.Schema({
    carNumber:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    items: [billItemSchema],
    totalAmount:{
        type:Number,
        required: true
    },
    isPaid:{
        type: Boolean,
        required: true
    }
})

const Bill = mongoose.model('Bill', BillSchema)

module.exports = Bill;