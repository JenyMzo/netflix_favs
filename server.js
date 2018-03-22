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
// server.listen(port);

// server.route({
//     method: "GET",
//     path: "/",
//     handler: (request, response) => {
//         return "Hello World";
//     }
// });

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