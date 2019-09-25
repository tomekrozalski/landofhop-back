"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _place = _interopRequireDefault(require("../place.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getMany = (req, res) => {
  _place.default.aggregate([{
    $project: {
      city: {
        $slice: ['$city', 1]
      },
      _id: 0,
      id: '$_id',
      institution_id: '$institution'
    }
  }, {
    $lookup: {
      from: 'institutions',
      localField: 'institution_id',
      foreignField: '_id',
      as: 'institution'
    }
  }, {
    $unwind: {
      path: '$institution',
      preserveNullAndEmptyArrays: true
    }
  }, {
    $unwind: {
      path: '$city'
    }
  }, {
    $project: {
      city: 1,
      id: 1,
      institution: {
        $slice: ['$institution.name', 1]
      }
    }
  }, {
    $unwind: {
      path: '$institution'
    }
  }, {
    $project: {
      label: {
        $concat: ['$city.value', ' (', '$institution.value', ')']
      },
      value: '$id'
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

var _default = getMany;
exports.default = _default;