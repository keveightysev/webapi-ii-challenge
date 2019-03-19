const express = require('express');

const dbRouter = require('./data/db-route');

const server = express();

server.use(express.json());

server.use('/api/users', dbRouter);

module.exports = server;
