'use strict';

const express = require('express');
const router = express.Router();
const Session = require('../../models/Session');
const Movie = require('../../models/Movie');
const Cinema = require('../../models/Cinema')

const asyncMiddleware = require('../middlewares/async-middleware');
const {notFound, conflict} = require('../errors');
const {ObjectId} = require('mongoose').Types;

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
        const session = await Session.findOne(
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

// router.put('/:id', asyncMiddleware(async (req, res) => {
//     const { body } = req;
  
//     const existMovieByName = await .findOne({
//       _id: {$ne: new ObjectId(req.params.id)},
//       nome: new RegExp('^' + body.nome + '$', 'i')});
//     const movie = await Movie.findByIdAndUpdate(req.params.id, body);
  
//     if (existMovieByName) throw conflict('Already exist the movie with this name.');
//     if (!movie) throw notFound('Movie nout found!');
  
//     res.status(204).send();
//   }));
  
//   router.delete('/:id', asyncMiddleware(async (req, res) => {
//     const movie = await Movie.findByIdAndDelete(req.params.id);
  
//     if (!movie) throw notFound('Movie nout found!');
//     res.status(204).send();
//   }));

module.exports = router;
