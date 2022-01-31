// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')

// ENV
const { DATABASE_URL, PORT } = process.env

// INIT APP 
const app = express()

//MONGO 
mongoose.connect(DATABASE_URL)
const db = mongoose.connection
db.on('connected', () => console.log("Mongo Live"))
db.on('error', (err) => console.log("Mongo disconnected", err))

// middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

const admin = require("firebase-admin");

const serviceAccount = require("./services.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// listen to port
app.listen(PORT, () => console.log('Listening for Express'))