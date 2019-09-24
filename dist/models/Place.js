"use strict";

const mongoose = require('mongoose');

const langValue = require("./fragments/langValueSchema");

const {
  Schema
} = mongoose;
const locationSchema = Schema({
  type: {
    type: String,
    enum: ['Point']
  },
  coordinates: [Schema.Types.Decimal128]
}, {
  _id: false
});
const placeSchema = new Schema({
  city: [langValue],
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  institution: {
    type: Schema.Types.ObjectId,
    ref: 'Institution',
    required: true
  },
  location: locationSchema,
  shortId: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Place', placeSchema);