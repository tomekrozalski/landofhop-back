"use strict";

const mongoose = require('mongoose');

const langValue = require("./langValueSchema");

const brewingSchema = require("./brewingSchema");

const impressionsSchema = require("./impressionsSchema");

const ingredientsSchema = require("./ingredientsSchema");

const priceSchema = require("./priceSchema");

const {
  Schema
} = mongoose;
const generalSchema = new Schema({
  series: {
    type: [langValue],
    default: undefined
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Institution'
  },
  cooperation: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Institution'
    }],
    default: undefined
  },
  contract: {
    type: Schema.Types.ObjectId,
    ref: 'Institution'
  },
  place: {
    type: Schema.Types.ObjectId,
    ref: 'Place'
  },
  tale: {
    type: [langValue],
    default: undefined
  }
}, {
  _id: false
});
const producerSchema = new Schema({
  general: generalSchema,
  brewing: brewingSchema,
  ingredients: ingredientsSchema,
  impressions: impressionsSchema,
  price: {
    type: [priceSchema],
    default: undefined
  }
}, {
  _id: false
});
module.exports = producerSchema;