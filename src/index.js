'use strict';

const db = require('./db');
const api = require('./api');
const http = require('http');

const  createDataFake  = require('../src/db/pupulateDatabase')

const port = 8080
const timeout = 60 * 60 * 1000 // 1 hour


db.connect()
  .then(() => {
    createDataFake()
  });

const server = http.createServer(api);
server.setTimeout(timeout);
server.listen(port);
