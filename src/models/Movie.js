'use strict';

const mongoose = require('mongoose');
const {defaultTransform} = require('./_utils');

const movieSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true, 
    minlength: 2, 
    maxlength: 100
  },
  genre: {
    type: String, 
    required: true, 
    minlength: 2, 
    maxlength: 100
  },
  duration: {
    type: Number, 
    required: true, 
    min: 1, 
    max: 999
  },
  classification: {
    type: Number, 
    required: true, 
    min: 0, 
    max: 99
  },
  release: {
    type: Date, 
    required: true
  },
  synopsis: {
    type: String, 
    required: true, 
    minlength: 2
  },
});

movieSchema.set('toJSON', {
  transform: defaultTransform,
});

module.exports = mongoose.model('Movie', movieSchema);
