'use strict';

const mongoose = require('mongoose');
const {defaultTransform} = require('./_utils');

const cinemaSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true, 
    minlength: 2, 
    maxlength: 100
  },
  city: {
    type: String, 
    required: true, 
    minlength: 2, 
    maxlength: 100
  },
  state: {
    type: String, 
    required: true, 
    min: 1, 
    max: 999
  }
});

cinemaSchema.virtual('id').get(function() {
  return this._id;
});

cinemaSchema.set('toJSON', {
  transform: defaultTransform,
});

module.exports = mongoose.model('Cinema', cinemaSchema);
