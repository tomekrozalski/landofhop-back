"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _country = _interopRequireDefault(require("../country.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveOne = (req, res) => {
  const country = new _country.default(req.body);
  country.save().then(result => {
    res.status(200).json(result);
  }).catch(() => {
    res.status(500).json({
      message: 'An error occured'
    });
  });
};

var _default = saveOne;
exports.default = _default;