'use strict';

const mongoose = require('mongoose');
const {defaultTransform} = require('./_utils');
const { Schema} = require('mongoose');

const sessionSchema = new mongoose.Schema({
  dayWeek: {
    type: String, 
    required: true, 
    minlength: 2, 
    maxlength: 30
  },
  schedule: {
    type: String, 
    required: true, 
    minlength: 2, 
    maxlength: 10
  },
  movie: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: true
  },
  cinema: {
      type: Schema.Types.ObjectId,
      ref: 'Cinema',
      required: true
  }
});

sessionSchema.set('toJSON', {
  transform: defaultTransform,
});

module.exports = mongoose.model('Session', sessionSchema);
