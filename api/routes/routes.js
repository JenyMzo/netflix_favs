'use strict';

module.exports = function (server) {
  const movies = require('../controllers/moviesController.js');

  server.route({
    method: 'GET',
    path: '/movies',
    handler: movies.list_all_movies
  });

  server.route({
    method: 'POST',
    path: '/movies',
    handler: movies.create_a_movie
  });

  server.route({
    method: 'GET',
    path: '/movies/{id}',
    handler: movies.get_a_movie
  });

  server.route({
    method: 'PUT',
    path: '/movies/{id}',
    handler: movies.update_a_movie
  });

  server.route({
    method: 'DELETE',
    path: '/movies/{id}',
    handler: movies.delete_a_movie
  });
}