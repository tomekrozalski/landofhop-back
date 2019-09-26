"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _models = require("./models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const beverageSchema = new _mongoose.default.Schema({
  shortId: {
    type: String,
    required: true
  },
  badge: {
    type: String,
    required: true
  },
  label: {
    type: _models.labelSchema,
    required: true
  },
  producer: _models.producerSchema,
  editorial: _models.editorialSchema,
  added: {
    type: Date,
    required: true
  },
  updated: Date
}, {
  strict: false
});
beverageSchema.index({
  badge: 1,
  shortId: 1
}, {
  unique: true
});

var _default = _mongoose.default.model('Beverage', beverageSchema);

exports.default = _default;