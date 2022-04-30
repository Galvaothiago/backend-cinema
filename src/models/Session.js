'use strict';

const mongoose = require('mongoose');
const {defaultTransform} = require('./_utils');
const {ObjectId} = require('mongoose').Types;

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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true
  },
  cinema: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cinema',
      required: true
  }
});

sessionSchema.virtual('id').get(function() {
  return this._id;
});

sessionSchema.set('toJSON', {
  transform: defaultTransform,
});

module.exports = mongoose.model('Session', sessionSchema);
