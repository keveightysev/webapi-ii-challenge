const express = require('express');

const cors = require('cors');

const dbRouter = require('./data/db-route');

const server = express();

server.use(express.json());

server.use(cors());

server.use('/api/posts', dbRouter);

module.exports = server;
