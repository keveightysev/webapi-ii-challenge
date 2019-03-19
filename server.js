const express = require('express');

const dbRouter = require('./data/db-route');

const server = express();

server.use(express.json());

server.use('/api/posts', dbRouter);

module.exports = server;
