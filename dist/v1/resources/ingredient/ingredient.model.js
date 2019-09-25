"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _models = require("../../utils/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ingredientSchema = new _mongoose.default.Schema({
  badge: {
    type: String,
    required: true
  },
  name: {
    type: [_models.langValue],
    required: true
  },
  type: {
    type: String,
    enum: ['malt', 'hop', 'yeast', 'appendix'],
    required: true
  }
});

var _default = _mongoose.default.model('Ingredient', ingredientSchema);

exports.default = _default;