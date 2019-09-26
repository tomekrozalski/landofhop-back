"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseInt = _interopRequireDefault(require("mongoose-int32"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const impressionsSchema = new _mongoose.default.Schema({
  bitterness: {
    type: _mongooseInt.default,
    min: 0,
    max: 100
  },
  sweetness: {
    type: _mongooseInt.default,
    min: 0,
    max: 100
  },
  fullness: {
    type: _mongooseInt.default,
    min: 0,
    max: 100
  },
  power: {
    type: _mongooseInt.default,
    min: 0,
    max: 100
  },
  hoppyness: {
    type: _mongooseInt.default,
    min: 0,
    max: 100
  },
  temperature: {
    from: {
      type: _mongooseInt.default,
      min: 0,
      max: 100
    },
    to: {
      type: _mongooseInt.default,
      min: 0,
      max: 100
    },
    unit: {
      type: String,
      enum: ['celcius']
    }
  }
}, {
  _id: false
});
var _default = impressionsSchema;
exports.default = _default;