"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseInt = _interopRequireDefault(require("mongoose-int32"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const agedSchema = new _mongoose.default.Schema({
  type: {
    type: String,
    enum: ['barrel', 'wood']
  },
  wood: String,
  time: {
    value: {
      type: _mongooseInt.default,
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
var _default = agedSchema;
exports.default = _default;