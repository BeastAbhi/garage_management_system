const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phoneNo:{
        type : String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true,
        unique: true
    },
    date:{
        type: Date,
        default: Date.now
    },
})

const User = mongoose.model('user',UserSchema)
module.exports = User;