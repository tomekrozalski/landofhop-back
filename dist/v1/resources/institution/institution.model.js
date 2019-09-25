"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _models = require("../../utils/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const institutionSchema = new _mongoose.default.Schema({
  badge: {
    type: String,
    required: true
  },
  name: {
    type: [_models.langValue],
    required: true
  },
  shortId: {
    type: String,
    required: true
  },
  website: String,
  consortium: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Institution'
  }
});
institutionSchema.index({
  badge: 1,
  shortId: 1
}, {
  unique: true
});

var _default = _mongoose.default.model('Institution', institutionSchema);

exports.default = _default;