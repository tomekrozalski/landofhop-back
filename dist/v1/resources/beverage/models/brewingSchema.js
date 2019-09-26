"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseInt = _interopRequireDefault(require("mongoose-int32"));

var _models = require("../../../utils/models");

var _agedSchema = _interopRequireDefault(require("./agedSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const brewingSchema = new _mongoose.default.Schema({
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
      type: _mongoose.default.Schema.Types.Decimal128,
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
      type: _mongoose.default.Schema.Types.Decimal128,
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
    type: [_agedSchema.default],
    default: undefined
  },
  style: {
    type: [_models.langValue],
    default: undefined
  },
  dryHopped: _mongoose.default.Schema.Types.Mixed,
  expirationDate: {
    value: {
      type: _mongooseInt.default,
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
var _default = brewingSchema;
exports.default = _default;