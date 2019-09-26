"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const checkAuth = (req, res) => {
  res.status(200).json({
    success: true
  });
};

var _default = checkAuth;
exports.default = _default;