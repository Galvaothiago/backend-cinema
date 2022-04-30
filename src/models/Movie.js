'use strict';

const mongoose = require('mongoose');
const {defaultTransform} = require('./_utils');

const movieSchema = new mongoose.Schema({
  nome: {
    type: String, 
    required: true, 
    minlength: 2, 
    maxlength: 100
  },
  genero: {
    type: String, 
    required: true, 
    minlength: 2, 
    maxlength: 100
  },
  duracao: {
    type: Number, 
    required: true, 
    min: 1, 
    max: 999
  },
  classificacao: {
    type: Number, 
    required: true, 
    min: 0, 
    max: 99
  },
  lancamento: {
    type: Date, 
    required: true
  },
  sinopse: {
    type: String, 
    required: true, 
    minlength: 2
  },
});

movieSchema.set('toJSON', {
  transform: defaultTransform,
});

module.exports = mongoose.model('Movie', movieSchema);
