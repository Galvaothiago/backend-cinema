'use strict';

const express = require('express');
const router = express.Router();
const Cinema = require('../../models/Cinema');
const asyncMiddleware = require('../middlewares/async-middleware');
const {notFound, conflict} = require('../errors');
const {ObjectId} = require('mongoose').Types;

const transformText = require('../utils/formatText');

router.get('/', asyncMiddleware(async (req, res) => {
  try {
    const { body } = req;

    if(body.name) {
      const name = transformText(body.name)
      
      const cinemaByName = await Cinema.find({
        name
      }).exec()

      if(!cinemaByName) throw notFound("We couldn't find a Cinema with that name");

      res.json(cinemaByName)
      return;
    }

    if(body.city) {
      const city = transformText(body.city)

      const cinemaByCity = await Cinema.find({
        city
      })

      if(!cinemaByCity) throw notFound("We still don't have a cinema registered in this city");

      res.json(cinemaByCity)
      return;
    }
    const cinemas = await Cinema.find()

    if(!cinemas) throw notFound('ERROR')

    res.json(cinemas)
  } catch(err) {
    res.json(err)
  }
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
