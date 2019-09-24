"use strict";

const mongoose = require('mongoose');

const {
  editorialSchema,
  labelSchema,
  producerSchema
} = require("./fragments");

const {
  Schema
} = mongoose;
const beverageSchema = new Schema({
  shortId: {
    type: String,
    required: true
  },
  badge: {
    type: String,
    required: true
  },
  label: {
    type: labelSchema,
    required: true
  },
  producer: producerSchema,
  editorial: editorialSchema,
  added: {
    type: Date,
    required: true
  },
  updated: Date
}, {
  strict: false
});
module.exports = mongoose.model('Beverage', beverageSchema);