"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const langValueCompleteSchema = new _mongoose.default.Schema({
  complete: Boolean,
  language: String,
  value: String
}, {
  _id: false
});
const ingredientsSchema = new _mongoose.default.Schema({
  description: {
    type: [langValueCompleteSchema],
    default: undefined
  },
  list: {
    type: [{
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'Ingredient'
    }],
    default: undefined
  },
  smokedMalt: {
    type: Boolean,
    validate: {
      validator(v) {
        return v;
      },

      message: props => `${props.value} need to be true or be undefined`
    }
  }
}, {
  _id: false
});
var _default = ingredientsSchema;
exports.default = _default;