'use strict';

const express = require('express');
const router = express.Router();
const Session = require('../../models/Session');
const asyncMiddleware = require('../middlewares/async-middleware');
const {notFound, conflict} = require('../errors');
const {ObjectId} = require('mongoose').Types;

router.get('/', asyncMiddleware(async (req, res) => {
  const allSessions = await Session.find().populate(['Movie', 'Cinema']).exec();
  res.json(allSessions);
}));

router.get('/:cinemaId', asyncMiddleware(async (req, res) => {
    try {
        const session = await Session.findOne({_id: {$ne: new ObjectId(req.params.id)}})

        if(!session) throw new notFound('Cinema not found')
        res.json(session);

    } catch(err) {
        res.json(err)
    }

}))

module.exports = router;
