const mongoose  = require("mongoose")

const { Schema } = mongoose;

const CarChecksSchema = new Schema({
    carNumber:{
        type: String,
        required: true
    },
    toolKit:{
        type: Boolean,
        required:true
    },
    images:{
        frontImageURI:{
            type: String,
            required: true
        },
        rightImageURI:{
            type: String,
            required: true
        },
        backImageURI:{
            type: String,
            required: true
        },
        leftImageURI:{
            type: String,
            required: true
        }
    },
    centerLock:{
        type: Boolean,
        required: true
    },
    powerWindow:{
        type: Boolean,
        required: true
    },
    technician:{
        type: String
    },
    advisory:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    note:{
        type: String
    }
})

const CarChecks = mongoose.model('carChaecks',CarChecksSchema);
module.exports = CarChecks;