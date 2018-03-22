'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    name: {
        type: String,
        unique : true,
        required: 'Please enter the name of the movie'
    },
    description: {
        type: String,
        required: 'Please enter the description of the movie'
    },
    coverUrl: {
        type: String,
        required: 'Please enter the cover url of the movie'
    },
    review: {
        type: String,
        required: 'Please enter the review of the movie'
    }
});

module.exports = mongoose.model('Movie', MovieSchema);