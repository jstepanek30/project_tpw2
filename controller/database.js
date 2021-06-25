const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/zapocet', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then(resolve => console.log('Connected to the database'))
    .catch(err => console.log(err))

const db = mongoose.connection;


module.exports = db;