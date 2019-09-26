"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _beverage = _interopRequireDefault(require("../beverage.model"));

var _cap = require("../images/cap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveCapImage = (req, res) => {
  const {
    buffer
  } = req.file;
  const {
    brand,
    badge,
    id,
    shortId
  } = req.body;
  const capPath = `${brand}/${badge}/${shortId}/cap`;
  (0, _cap.saveCap)(buffer, capPath, () => {
    _beverage.default.findByIdAndUpdate(id, {
      'editorial.cap': true
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

var _default = saveCapImage;
exports.default = _default;