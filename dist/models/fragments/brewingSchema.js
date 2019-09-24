"use strict";

const mongoose = require('mongoose');

const Int32 = require('mongoose-int32');

const langValue = require("./langValueSchema");

const agedSchema = require("./agedSchema");

const {
  Schema
} = mongoose;
const brewingSchema = new Schema({
  fermentation: {
    type: [{
      type: String,
      enum: ['top', 'bottom', 'spontaneous']
    }],
    default: undefined
  },
  extract: {
    relate: {
      type: String,
      enum: ['weight', 'blg', 'plato'],

      required() {
        return this.extract.unit || this.extract.value;
      }

    },
    unit: {
      type: String,
      enum: ['percent', 'degree'],

      required() {
        return this.extract.relate || this.extract.value;
      }

    },
    value: {
      type: Schema.Types.Decimal128,
      min: 0,
      max: 100,

      required() {
        return this.extract.relate || this.extract.unit;
      }

    }
  },
  alcohol: {
    relate: {
      type: String,
      enum: ['capacity', 'abv'],

      required() {
        return this.alcohol.unit || this.alcohol.value;
      }

    },
    unit: {
      type: String,
      enum: ['percent', 'degree'],

      required() {
        return this.alcohol.relate || this.alcohol.value;
      }

    },
    value: {
      type: Schema.Types.Decimal128,
      min: 0,
      max: 100,

      required() {
        return this.alcohol.relate || this.alcohol.unit;
      }

    },
    scope: {
      type: String,
      enum: ['<0.5%', '±0.5%', '±1.0%']
    }
  },
  filtration: Boolean,
  pasteurization: Boolean,
  aged: {
    type: [agedSchema],
    default: undefined
  },
  style: {
    type: [langValue],
    default: undefined
  },
  dryHopped: Schema.Types.Mixed,
  expirationDate: {
    value: {
      type: Int32,
      min: 0,
      max: 10000,

      required() {
        return this.expirationDate.unit;
      }

    },
    unit: {
      type: String,
      enum: ['day', 'month', 'year'],

      required() {
        return this.expirationDate.value;
      }

    }
  }
}, {
  _id: false
});
module.exports = brewingSchema;