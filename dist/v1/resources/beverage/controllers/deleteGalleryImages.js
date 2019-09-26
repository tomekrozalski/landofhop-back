"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _beverage = _interopRequireDefault(require("../beverage.model"));

var _gallery = require("../images/gallery");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteGalleryImages = (req, res) => {
  const {
    badge,
    brand,
    files,
    id,
    shortId
  } = req.body;
  (0, _gallery.removeGallery)({
    brand,
    badge,
    files,
    shortId
  }, res, () => {
    _beverage.default.findByIdAndUpdate(id, {
      $unset: {
        'editorial.images': ''
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

var _default = deleteGalleryImages;
exports.default = _default;