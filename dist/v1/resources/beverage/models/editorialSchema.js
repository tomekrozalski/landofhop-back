"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseInt = _interopRequireDefault(require("mongoose-int32"));

var _models = require("../../../utils/models");

var _agedSchema = _interopRequireDefault(require("./agedSchema"));

var _priceSchema = _interopRequireDefault(require("./priceSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generalSchema = new _mongoose.default.Schema({
  cooperation: {
    type: [{
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'Institution'
    }],
    default: undefined
  },
  contract: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Institution'
  },
  place: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Place'
  }
}, {
  _id: false
});
const brewingSchema = new _mongoose.default.Schema({
  fermentation: {
    type: [{
      type: String,
      enum: ['top', 'bottom', 'spontaneous']
    }],
    default: undefined
  },
  alcohol: {
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
  dryHopped: _mongoose.default.Schema.Types.Mixed
}, {
  _id: false
});
const impressionsSchema = new _mongoose.default.Schema({
  color: String,
  clarity: {
    type: String,
    enum: ['crystalline', 'clear', 'opalescent', 'misty', 'hazy', 'muddy']
  }
}, {
  _id: false
});
const editorialSchema = new _mongoose.default.Schema({
  general: generalSchema,
  brewing: brewingSchema,
  impressions: impressionsSchema,
  price: {
    type: [_priceSchema.default],
    default: undefined
  },
  images: _mongooseInt.default,
  cap: {
    type: Boolean,
    validate: {
      validator(v) {
        return v;
      },

      message: props => `${props.value} need to be true or be undefined`
    }
  },
  notes: String
}, {
  _id: false
});
var _default = editorialSchema;
exports.default = _default;