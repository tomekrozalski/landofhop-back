"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = new _mongoose.default.Schema({
  language: {
    type: String,
    required: false
  },
  value: {
    type: String,
    required: true
  }
}, {
  _id: false
});

exports.default = _default;