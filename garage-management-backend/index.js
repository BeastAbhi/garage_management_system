const connectToMongo = require('./db')
const express = require('express')
connectToMongo();
const app = express()
const cors = require('cors');
const port = 5000

app.use(cors());
app.use(express.json()); // To handle JSON-encoded data

//Available Routes
//This is the authintication rout
app.use('/api/auth', require('./routes/auth'))

app.use('/api/cars', require('./routes/cars'))

app.use('/api/carchecks', require('./routes/carChecks'))

app.use('/api/bill', require('./routes/bill'))

app.use('/api/stock', require('./routes/stock'))




app.listen(port, () => {
  console.log(`App is listed on port: ${port}`)
})