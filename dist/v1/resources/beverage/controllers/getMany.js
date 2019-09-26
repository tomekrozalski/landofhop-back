"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _beverage = _interopRequireDefault(require("../beverage.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getMany = (req, res) => {
  _beverage.default.aggregate([{
    $project: {
      _id: 0,
      added: 1,
      badge: 1,
      brand: '$label.general.brand',
      container: '$label.container',
      id: '$_id',
      name: '$label.general.name',
      shortId: 1
    }
  }, {
    $lookup: {
      from: 'institutions',
      localField: 'brand',
      foreignField: '_id',
      as: 'brand_info'
    }
  }, {
    $unwind: '$brand_info'
  }, {
    $project: {
      added: 1,
      badge: 1,
      brand: {
        badge: '$brand_info.badge',
        name: '$brand_info.name'
      },
      container: {
        type: 1,
        unit: 1,
        value: 1
      },
      id: 1,
      name: 1,
      shortId: 1
    }
  }]).then(result => {
    const formattedResults = result.map(beverage => _objectSpread({}, beverage, {
      container: _objectSpread({}, beverage.container, {
        value: Number(beverage.container.value.toString())
      })
    }));
    res.status(200).json(formattedResults);
  }).catch(() => {
    res.status(500).json({
      message: 'An error occured'
    });
  });
};

var _default = getMany;
exports.default = _default;