"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ingredient = _interopRequireDefault(require("../ingredient.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getMany = (req, res) => {
  _ingredient.default.aggregate([{
    $project: {
      _id: 0,
      id: '$_id',
      name: {
        $slice: ['$name', 1]
      },
      type: 1
    }
  }, {
    $unwind: '$name'
  }, {
    $project: {
      value: '$id',
      label: '$name.value',
      type: 1
    }
  }]).then(result => {
    res.status(200).json(result);
  }).catch(() => {
    res.status(500).json({
      message: 'An error occured'
    });
  });
};

var _default = getMany;
exports.default = _default;