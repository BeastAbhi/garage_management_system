const mongoose = require('mongoose')

const { Schema } = mongoose

const CarSchema = new Schema({
    carNumber:{
        type: String,
        required: true,
        unique: true 
    },
    ownerName:{
        type: String,
        required: true
    },
    ownerMobNumber:{
        type: String,
        required: true
    },
    carModel:{
        type: String,
        required: true
    },
    serviceStatus:{
        type: Boolean,
        required: true
    }
})

const Cars = mongoose.model('cars', CarSchema);
module.exports = Cars