const express = require('express')
const mongoose = require('mongoose')
const main = require('./routes/main')

require('dotenv').config()

const app = express()

/*
    RUN INSERT.JS first
    run this file then add a new admin user
    then delete the decoy account
*/

mongoose.connect('MONGO URI', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', main)







app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000...'))