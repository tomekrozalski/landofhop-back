"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const generate = require('nanoid/generate');

const withShortId = (req, res, next) => {
  const allowedTypes = 'abcdefghijklmnoprstuwvxyz01234567890';
  req.shortId = generate(allowedTypes, 6);
  next();
};

var _default = withShortId;
exports.default = _default;