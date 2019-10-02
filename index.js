const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

/* Routes */
const authRoute = require('./routes/auth')
const dashRoute = require('./routes/dashboard')

dotenv.config()

/* DB */
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to db')
)

/* Middleware */
app.use(express.json())

/* Route middleware */
app.use('/api/user', authRoute)
app.use('/api/dash', dashRoute)

app.listen(5000, () => console.log('Server up and running.'))
