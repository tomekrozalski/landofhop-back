"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _models = require("../../utils/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const locationSchema = _mongoose.default.Schema({
  type: {
    type: String,
    enum: ['Point']
  },
  coordinates: [_mongoose.default.Schema.Types.Decimal128]
}, {
  _id: false
});

const placeSchema = new _mongoose.default.Schema({
  city: [_models.langValue],
  country: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  institution: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Institution',
    required: true
  },
  location: locationSchema,
  shortId: {
    type: String,
    required: true
  }
});
placeSchema.index({
  shortId: 1
}, {
  unique: true
});

var _default = _mongoose.default.model('Place', placeSchema);

exports.default = _default;