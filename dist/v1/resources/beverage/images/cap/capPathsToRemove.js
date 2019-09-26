"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function capPathsToRemove({
  badge,
  brand,
  shortId
}) {
  return [{
    Key: `${brand}/${badge}/${shortId}/cap/jpg/4x.jpg`
  }, {
    Key: `${brand}/${badge}/${shortId}/cap/jpg/2x.jpg`
  }, {
    Key: `${brand}/${badge}/${shortId}/cap/jpg/1x.jpg`
  }, {
    Key: `${brand}/${badge}/${shortId}/cap/webp/4x.webp`
  }, {
    Key: `${brand}/${badge}/${shortId}/cap/webp/2x.webp`
  }, {
    Key: `${brand}/${badge}/${shortId}/cap/webp/1x.webp`
  }, {
    Key: `${brand}/${badge}/${shortId}/cap/jpg`
  }, {
    Key: `${brand}/${badge}/${shortId}/cap/webp`
  }, {
    Key: `${brand}/${badge}/${shortId}/cap`
  }];
}

var _default = capPathsToRemove;
exports.default = _default;