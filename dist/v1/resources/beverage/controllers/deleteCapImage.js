"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _beverage = _interopRequireDefault(require("../beverage.model"));

var _cap = require("../images/cap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteCapImage = (req, res) => {
  const {
    badge,
    brand,
    id,
    shortId
  } = req.body;
  (0, _cap.removeCap)({
    badge,
    brand,
    shortId
  }, res, () => {
    _beverage.default.findByIdAndUpdate(id, {
      $unset: {
        'editorial.cap': ''
      }
    }, {
      useFindAndModify: false
    }).then(result => {
      res.status(200).json(result);
    }).catch(() => {
      res.status(500).json({
        message: 'An error occured'
      });
    });
  });
};

var _default = deleteCapImage;
exports.default = _default;