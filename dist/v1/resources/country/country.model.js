"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const countrySchema = new _mongoose.default.Schema({
  code: {
    type: String,
    required: false
  },
  name: [{
    language: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: true
    }
  }]
});

var _default = _mongoose.default.model('Country', countrySchema);

exports.default = _default;