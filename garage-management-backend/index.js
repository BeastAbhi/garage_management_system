const connectToMongo = require('./db')
const express = require('express')
connectToMongo();
const bodyParser = require('body-parser')
const app = express()
const port = 5000

app.use(express.json()); // To handle JSON-encoded data

//Available Routes
//This is the authintication rout
app.use('/api/auth', require('./routes/auth'))

app.use('/api/cars', require('./routes/cars'))




app.listen(port, () => {
  console.log(`App is listed on port: ${port}`)
})