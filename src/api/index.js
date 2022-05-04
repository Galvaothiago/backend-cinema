'use strict';

const express = require('express');
const api = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const routes = require('./routes');
const cors = require('cors');

api.use(logger('dev'));
api.use(helmet());
api.use(compression());
api.use(bodyParser.json());
api.use(cors())

api.use(express.urlencoded({extended: true}));

api.use(routes);

module.exports = api;
