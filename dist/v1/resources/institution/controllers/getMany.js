"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _institution = _interopRequireDefault(require("../institution.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getMany = (req, res) => {
  _institution.default.aggregate([{
    $project: {
      _id: 0,
      badge: 1,
      name: {
        $slice: ['$name', 1]
      },
      value: '$_id'
    }
  }, {
    $unwind: {
      path: '$name'
    }
  }, {
    $project: {
      badge: 1,
      label: '$name.value',
      value: 1
    }
  }, {
    $sort: {
      name: 1
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