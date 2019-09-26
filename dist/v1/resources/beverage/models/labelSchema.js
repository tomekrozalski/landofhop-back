"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseInt = _interopRequireDefault(require("mongoose-int32"));

var _models = require("../../../utils/models");

var _brewingSchema = _interopRequireDefault(require("./brewingSchema"));

var _impressionsSchema = _interopRequireDefault(require("./impressionsSchema"));

var _ingredientsSchema = _interopRequireDefault(require("./ingredientsSchema"));

var _priceSchema = _interopRequireDefault(require("./priceSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generalSchema = new _mongoose.default.Schema({
  name: {
    type: [_models.langValue],
    validate: {
      validator(v) {
        return v.length;
      },

      message: props => `${props.value} is empty`
    },
    required: true
  },
  series: {
    type: [_models.langValue],
    default: undefined
  },
  brand: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Institution',
    required: true
  },
  cooperation: {
    type: [{
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'Institution'
    }],
    default: undefined
  },
  contract: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Institution'
  },
  place: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Place'
  },
  tale: {
    type: [_models.langValue],
    validate: {
      validator(v) {
        return !v.find(({
          value
        }) => value.length < 5);
      },

      message: props => `${props.value} has less then 4 signs`
    },
    default: undefined
  },
  barcode: String
}, {
  _id: false
});
const containerSchema = new _mongoose.default.Schema({
  color: {
    type: String,
    enum: ['brown', 'green', 'black', 'silver']
  },
  material: {
    type: String,
    enum: ['glass', 'aluminum']
  },
  unit: {
    type: String,
    enum: ['ml']
  },
  type: {
    type: String,
    enum: ['bottle', 'can']
  },
  value: {
    type: _mongooseInt.default,
    min: 0,
    max: 100000
  },
  hasCapWireFlip: {
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
const labelSchema = new _mongoose.default.Schema({
  general: {
    type: generalSchema,
    required: true
  },
  brewing: _brewingSchema.default,
  ingredients: _ingredientsSchema.default,
  impressions: _impressionsSchema.default,
  container: {
    type: containerSchema,
    required: true
  },
  price: {
    type: [_priceSchema.default],
    default: undefined
  }
}, {
  _id: false
});
var _default = labelSchema;
exports.default = _default;