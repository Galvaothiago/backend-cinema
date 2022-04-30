'use strict';

const express = require('express');
const router = express.Router();
const Cinema = require('../../models/Cinema');
const asyncMiddleware = require('../middlewares/async-middleware');
const {notFound, conflict} = require('../errors');
const {ObjectId} = require('mongoose').Types;

router.get('/', asyncMiddleware(async (req, res) => {
    const cinemas = await Cinema.find({})
  res.json(cinemas);
}));

router.get('/:id', asyncMiddleware(async (req, res) => {
  const cinema = await Cinema.findById(req.params.id);

  console.log(cinema)
  if (!cinema) throw notFound('Cinema not found!');

  res.json(cinema);
}));

router.post('/', asyncMiddleware(async (req, res) => {
  const { body } = req;
  const existCinema = await Cinema.findOne({
    name: new RegExp('^' + body.name + '$', 'i'),
  });

  if (existCinema) throw conflict('Already exist the cinema with this name');

  const cinema = await Cinema.create(body);

  res.status(201).location(`/cinemas/${cinema.id}`).json(
      {id: cinema.id});
  }));


router.put('/:id', asyncMiddleware(async (req, res) => {
  const { body } = req;

  const existCinemaByName = await Cinema.findOne({
  _id: {$ne: new ObjectId(req.params.id)},
    nome: new RegExp('^' + body.nome + '$', 'i')});

  const cinema = await Cinema.findByIdAndUpdate(req.params.id, body)

  if (existCinemaByName) throw conflict('Already exist the cinema with this name.');
  if (!cinema) throw notFound('Cinema not found');

  res.status(204).send(cinema);
}));

router.delete('/:id', asyncMiddleware(async (req, res) => {
  const cinema = await Cinema.findByIdAndDelete(req.params.id)

  if (!cinema) throw notFound('Cinema not found');
  res.status(204).send();
}));

module.exports = router;
