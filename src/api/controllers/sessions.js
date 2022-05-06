'use strict';

const express = require('express');
const router = express.Router();
const Session = require('../../models/Session');

const asyncMiddleware = require('../middlewares/async-middleware');
const { notFound } = require('../errors');
const { ObjectId } = require('mongoose').Types;

router.get('/', asyncMiddleware(async (req, res) => {
    try {
        const allSessions = await Session.find({});

        res.json(allSessions);
    } catch(err) {
        res.json(err);
    }
}));

router.get('/:cinemaId', asyncMiddleware(async (req, res) => {
    try {
        const session = await Session.find(
            {cinema: new ObjectId(req.params.cinemaId)}
        ).populate(['movie', 'cinema'])

        if(!session) throw new notFound('Cinema not found');
        res.json(session);

    } catch(err) {
        res.json(err);
    }
}))

router.post('/', asyncMiddleware(async (req, res) => {
    try {
        const { body } = req;

        const session = await Session.create(body)

        res.json(session);

    } catch(err) {
        res.json(err);
    }

}))

router.put('/:id', asyncMiddleware(async (req, res) => {
    const { body } = req;

    try {
        const session = await Session.findByIdAndUpdate(req.params.id, body);
        if (!session) throw notFound('Movie nout found!');

        res.status(204).send();
    } catch(err) {
        res.json(err)
    }
  

  
  }));
  
  router.delete('/:id', asyncMiddleware(async (req, res) => {
    try {
        const session = await Session.findByIdAndDelete(req.params.id);
        if (!session) throw notFound('Movie nout found!');

        res.status(204).send();
    } catch(err) {
        res.json(err)
    }
  
  }));

module.exports = router;
