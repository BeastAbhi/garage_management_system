const mongoose = require('mongoose')

const StockSchema = new mongoose.Schema({
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
    },
    minQuantity:{
        type: Number,
        required: true
    },
    lastAdded:{
        type: Date,
        required: true
    }
})

const Stock = mongoose.model('Stock', StockSchema)

module.exports = Stock;