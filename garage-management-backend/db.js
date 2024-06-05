const mongoose = require('mongoose');
require('dotenv').config()

const mongoURI = process.env.MONGO_URL;

const connectToMongo = async () =>{
    const it = await mongoose.connect(mongoURI)
}

module.exports = connectToMongo;
