"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _beverage = _interopRequireDefault(require("../beverage.model"));

var _toSave = _interopRequireDefault(require("../normalizers/toSave"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const updateOne = (req, res) => {
  _beverage.default.replaceOne({
    _id: req.body.id
  }, (0, _toSave.default)(req.body)).then(result => {
    res.status(200).json(result);
  }).catch(() => {
    res.status(500).json({
      message: 'An error occured'
    });
  });
};

var _default = updateOne;
exports.default = _default;