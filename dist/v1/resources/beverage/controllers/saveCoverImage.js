"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cover = require("../images/cover");

const saveCoverImage = (req, res) => {
  const {
    buffer
  } = req.file;
  const {
    brand,
    badge,
    shortId
  } = req.body;
  const coverPath = `${brand}/${badge}/${shortId}/cover`;
  (0, _cover.saveCover)(buffer, coverPath, () => {
    res.status(200).json({
      success: true
    });
  });
};

var _default = saveCoverImage;
exports.default = _default;