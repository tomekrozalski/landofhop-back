"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _models = require("../../utils/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const countrySchema = new _mongoose.default.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: [_models.langValue],
    required: true
  }
});
countrySchema.index({
  code: 1
}, {
  unique: true
});

var _default = _mongoose.default.model('Country', countrySchema);

exports.default = _default;