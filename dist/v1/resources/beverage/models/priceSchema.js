"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const priceSchema = new _mongoose.default.Schema({
  date: {
    type: Date
  },
  value: {
    type: _mongoose.default.Schema.Types.Decimal128,
    min: 0,
    max: 100000
  },
  currency: {
    type: String,
    enum: ['PLN', 'EUR']
  }
}, {
  _id: false
});
var _default = priceSchema;
exports.default = _default;