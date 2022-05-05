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

  if (!filme) throw notFound('Movie nout found!');

  res.json(filme);
}));


router.post('/', asyncMiddleware(async (req, res) => {
  const { body } = req; 

  try {
    const existMovieByName = await Movie.findOne({
      name: new RegExp('^' + body.name + '$', 'i')});
  
    if (existMovieByName) throw conflict('Already exist the movie with this name.');
  
    const movie = await Movie.create(body);
  
    res.status(201).location(`/movies/${movie.id}`).json({id: movie.id});

  } catch(err) {
    res.json(err)
  }

}));


router.put('/:id', asyncMiddleware(async (req, res) => {
  const { body } = req;

  const existMovieByName = await filmeModel.findOne({
    _id: {$ne: new ObjectId(req.params.id)},
    nome: new RegExp('^' + body.nome + '$', 'i')});
  const movie = await Movie.findByIdAndUpdate(req.params.id, body);

  if (existMovieByName) throw conflict('Already exist the movie with this name.');
  if (!movie) throw notFound('Movie nout found!');

  res.status(204).send();
}));

router.delete('/:id', asyncMiddleware(async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    
    if (!movie) throw notFound('Movie nout found!');
    
    res.status(204).send();
  } catch(err) {
    res.status(404).json(err)
  }

}));

module.exports = router;
