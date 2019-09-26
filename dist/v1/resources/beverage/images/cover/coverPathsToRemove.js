"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function coverPathsToRemove({
  badge,
  brand,
  shortId
}) {
  return [{
    Key: `${brand}/${badge}/${shortId}/cover/jpg/4x.jpg`
  }, {
    Key: `${brand}/${badge}/${shortId}/cover/jpg/2x.jpg`
  }, {
    Key: `${brand}/${badge}/${shortId}/cover/jpg/1x.jpg`
  }, {
    Key: `${brand}/${badge}/${shortId}/cover/webp/4x.webp`
  }, {
    Key: `${brand}/${badge}/${shortId}/cover/webp/2x.webp`
  }, {
    Key: `${brand}/${badge}/${shortId}/cover/webp/1x.webp`
  }, {
    Key: `${brand}/${badge}/${shortId}/cover/jpg`
  }, {
    Key: `${brand}/${badge}/${shortId}/cover/webp`
  }, {
    Key: `${brand}/${badge}/${shortId}/cover`
  }];
}

var _default = coverPathsToRemove;
exports.default = _default;