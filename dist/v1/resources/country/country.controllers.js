"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _country = _interopRequireDefault(require("./country.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const get = (req, res) => {
  _country.default.aggregate([{
    $project: {
      _id: 0,
      value: '$_id',
      name: 1
    }
  }, {
    $unwind: '$name'
  }, {
    $match: {
      'name.language': 'pl'
    }
  }, {
    $project: {
      value: 1,
      label: '$name.value'
    }
  }, {
    $sort: {
      label: 1
    }
  }]).then(result => {
    res.status(200).json(result);
  }).catch(() => {
    res.status(500).json({
      message: 'An error occured'
    });
  });
};

var _default = get;
exports.default = _default;