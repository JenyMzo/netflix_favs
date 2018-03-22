'use strict';

const Mongoose = require('mongoose');
const Movie = require('./api/models/movieModel');
//load database
Mongoose.connect('mongodb://medjs:medjs2017@ds121089.mlab.com:21089/netflix_movies');
let db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('Connection with database succeeded.');
});
exports.db = db;