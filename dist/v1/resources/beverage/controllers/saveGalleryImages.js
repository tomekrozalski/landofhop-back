"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _beverage = _interopRequireDefault(require("../beverage.model"));

var _gallery = require("../images/gallery");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveGalleryImages = (req, res) => {
  const {
    brand,
    badge,
    id,
    shortId
  } = req.body;
  (0, _gallery.saveGallery)(req.files, {
    brand,
    badge,
    shortId
  }, () => {
    _beverage.default.findByIdAndUpdate(id, {
      'editorial.images': req.files.length
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

var _default = saveGalleryImages;
exports.default = _default;