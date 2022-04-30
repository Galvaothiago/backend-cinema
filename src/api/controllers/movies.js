'use strict';

const express = require('express');
const router = express.Router();
const Movie = require('../../models/Movie');
const asyncMiddleware = require('../middlewares/async-middleware');
const {notFound, conflict} = require('../errors');
const {ObjectId} = require('mongoose').Types;

router.get('/', asyncMiddleware(async (req, res) => {
  res.json(await Movie.find({}));
}));


router.get('/:id', asyncMiddleware(async (req, res) => {
  const filme = await Movie.findById(req.params.id);

  if (!filme) throw notFound('Filme não encontrado');

  res.json(filme);
}));


router.post('/', asyncMiddleware(async (req, res) => {
  const { body } = req;

  const existMovieByName = await Movie.findOne({
    nome: new RegExp('^' + body.nome + '$', 'i')});

  if (existMovieByName) throw conflict('Já existe um Filme com o mesmo Nome.');

  const movie = await Movie.create(body);

  res.status(201).location(`/movies/${movie.id}`).json({id: filme.id});

}));


router.put('/:id', asyncMiddleware(async (req, res) => {
  const { body } = req;

  const existMovieByName = await filmeModel.findOne({
    _id: {$ne: new ObjectId(req.params.id)},
    nome: new RegExp('^' + body.nome + '$', 'i')});
  const movie = await Movie.findByIdAndUpdate(req.params.id, body);

  if (existMovieByName) throw conflict('Já existe um Filme com o mesmo Nome.');
  if (!movie) throw notFound('Filme não encontrado');

  res.status(204).send();
}));

router.delete('/:id', asyncMiddleware(async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) throw notFound('Filme não encontrado');
  res.status(204).send();
}));

module.exports = router;
