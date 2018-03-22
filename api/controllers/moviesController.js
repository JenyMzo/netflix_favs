'use strict';

const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

exports.list_all_movies = function (req, res) {
  return Movie.find({}).exec().then((movie) => {

    return { movies: movie };

  }).catch((err) => {

    return { err: err };

  });
};

exports.create_a_movie = function (req, res) {

  const movieData = {
    name: req.payload.name,
    description: req.payload.description,
    coverUrl: req.payload.coverUrl,
    review: req.payload.review
  };

  return Movie.create(movieData).then((movie) => {

    return { message: "Movie added successfully", movie: movie };

 }).catch((err) => {

   return { err: err };

 });
}

exports.get_a_movie = (req, h) => {

  return Movie.findById(req.params.id).exec().then((movie) => {

    if(!movie) return { message: 'Movie not Found' };

    return { movie: movie };

  }).catch((err) => {

    return { err: err };

  });
}

exports.update_a_movie = (req, h) => {

  return Movie.findById(req.params.id).exec().then((movie) => {
    if (!movie) return { err: 'movie not found' };
    let movieData = movie;
    movieData.name = !!req.payload.name ? req.payload.name : movie.name;
    movieData.description = !!req.payload.description ? req.payload.description : movie.name;
    movieData.coverUrl = !!req.payload.coverUrl ? req.payload.coverUrl : movie.coverUrl;
    movieData.review = !!req.payload.review ? req.payload.review : movie.review;
    movie.save(movieData);

  }).then((data) => {

      return { message: "Movie data updated successfully" };

  }).catch((err) => {

      return { err: err };

  });
}

exports.delete_a_movie = (req, h) => {

  return Movie.findById(req.params.id).exec().then((movie) => {

    if (!movie) return { message: 'Movie not found' };

    movie.remove(movie);

  }).then((data) => {

    return { success: true };

  }).catch((err) => {
    return { dberror: err };
  });
}