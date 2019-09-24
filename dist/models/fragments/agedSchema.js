"use strict";

const mongoose = require('mongoose');

const Int32 = require('mongoose-int32');

const {
  Schema
} = mongoose;
const agedSchema = new Schema({
  type: {
    type: String,
    enum: ['barrel', 'wood']
  },
  wood: String,
  time: {
    value: {
      type: Int32,
      min: 0,
      max: 10000
    },
    unit: {
      type: String,
      enum: ['day', 'month', 'year']
    }
  },
  previousContent: {
    type: [String],
    default: undefined
  }
}, {
  _id: false
});
module.exports = agedSchema;