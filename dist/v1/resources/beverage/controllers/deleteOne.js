"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _beverage = _interopRequireDefault(require("../beverage.model"));

var _images = require("../images");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveOne = (req, res) => {
  const {
    files,
    id,
    params
  } = req.body;
  const {
    badge,
    brand,
    shortId
  } = params;
  (0, _images.removeBeverageImages)({
    badge,
    brand,
    files,
    shortId
  }, res, () => {
    _beverage.default.deleteOne({
      _id: id
    }).then(result => {
      res.status(200).json(result);
    }).catch(() => {
      res.status(500).json({
        message: 'An error occured'
      });
    });
  });
};

var _default = saveOne;
exports.default = _default;