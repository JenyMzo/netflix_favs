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

//   // server.route('/movies/:movieId')
//   //   .get(movies.get_a_movie)
//   //   .put(movies.update_a_movie)
//   //   .delete(movies.delete_a_movie);

//   // server.get('*', function (req, res) {
//   //   console.log('res', res.statusCode);
//   //   return res.status(404).send({ url: req.originalUrl + 'not found' });
//   // });
// };

// server.route({
//     method: "GET",
//     path: "/",
//     handler: (request, response) => {
//         return "Hello World";
//     }
// });
}