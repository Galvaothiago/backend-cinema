'use strict';

const express = require('express');
const httpErrorParser = require('../middlewares/http-error-parser');
const http404Response = require('../middlewares/http-404-response');
const router = express.Router();

router.use('/movies', require('../controllers/movies'));
router.use('/cinemas', require('../controllers/cinemas'));
router.use('/sessions', require('../controllers/sessions'));
router.use(httpErrorParser);
router.use(http404Response);

module.exports = router;
