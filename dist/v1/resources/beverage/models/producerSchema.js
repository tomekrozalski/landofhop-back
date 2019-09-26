"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _models = require("../../../utils/models");

var _brewingSchema = _interopRequireDefault(require("./brewingSchema"));

var _impressionsSchema = _interopRequireDefault(require("./impressionsSchema"));

var _ingredientsSchema = _interopRequireDefault(require("./ingredientsSchema"));

var _priceSchema = _interopRequireDefault(require("./priceSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generalSchema = new _mongoose.default.Schema({
  series: {
    type: [_models.langValue],
    default: undefined
  },
  brand: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Institution'
  },
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
  },
  tale: {
    type: [_models.langValue],
    default: undefined
  }
}, {
  _id: false
});
const producerSchema = new _mongoose.default.Schema({
  general: generalSchema,
  brewing: _brewingSchema.default,
  ingredients: _ingredientsSchema.default,
  impressions: _impressionsSchema.default,
  price: {
    type: [_priceSchema.default],
    default: undefined
  }
}, {
  _id: false
});
var _default = producerSchema;
exports.default = _default;