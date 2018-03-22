# API REST TO REGISTER FAVORITE NETFLIX MOVIES
RESTful API With Node.js And Hapi with my favorite Netflix movies and tv shows

## Prerequisites

- NodeJS - NPM installed
- Postman

We are going to use [MongoLab](https://mlab.com) to host our database, so we don't need to have MongoDB installed on our machine.

## Getting started

- Open the terminal and create a new folder for the project ```mkdir netflix_favs```
- Navigate to the root of the folder ```cd netflix_favs```
- Create the package.json file ```npm init```
- Create a file called server.js ```touch server.js```
- Create a folder called api ```mkdir api```
- Inside api folder, we are going to create folders for models, controllers and routes ```mkdir api/controllers api/models api/routes```
- Create talksController.js and speakersController.js in the api/controller folder ```touch api/controllers/talksController.js api/controllers/speakerController.js```
- Create routes.js in the routes folder ```touch api/routes/routes.js```
- Create talkModel.js and speakerModel.js in the model folder ```touch api/models/talkModel.js api/models/speakerModel.js```

## Server setup

- Install express ```npm install hapi --save```
- Install nodemon as dev dependency  ```npm install --save-dev nodemon```
- On the package.json we are going to add the following script ```"start": "nodemon server.js"```
- This will be our initial server.js
```js
'use strict';

const Hapi = require("hapi");
const port = process.env.PORT || 3000;

const server = new Hapi.Server({
    host: "localhost",
    port: port
});

server.route({
    method: "GET",
    path: "/",
    handler: (request, response) => {
        return "Hello World";
    }
});

const start = async () => {
    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
};

start();
```
- On ther terminal ```npm run start``` so this will start the server


## Configuring Database

- Install mongoose ```npm install mongoose --save```
- Our speaker model should look like this:
```js
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
```
## Setting up the routes
- Our routes file should look like this:
```js
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
```
- Require routes.js on server.js
```js
const routes = require('./api/routes/routes.js');
```
- Call the function on server.js
```js
routes(server);
```

## Creating Controller
- Our speakers controller should look like this:
```js
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
```
## Conecting to the database
As mentioned before, we are going to use [MongoLab](https://mlab.com) to host our database, in fact it's already created, so let's connect :)
- Create a connection.js file
- Inside that file require mongoose, speaker and talk models
```js
'use strict';

const mongoose = require('mongoose');
const Speaker = require('./api/models/speakerModel');
const Movie = require('./api/models/movieModel');
```
- Connect to de database
```js
Mongoose.connect('mongodb://medjs:medjs2017@ds121089.mlab.com:21089/netflix_movies');
let db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('Connection with database succeeded.');
});
exports.db = db;
```
- Require connection.js on server.js
```js
const connection = require('./connection.js');
```
- Call the connection function on server.js
```js
connection();
```
## Consolidating server.js
Finally the server.js file should look like this:
```js
'use strict';

const connection = require('./connection.js');
const Hapi = require("hapi");
const port = process.env.PORT || 3000;
const routes = require('./api/routes/routes.js');

const server = new Hapi.Server({
    host: "localhost",
    port: port
});

connection.db;
routes(server);

const start = async () => {
    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
};

start();
```
