"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.status(403).json({
      message: 'Path forbidden for users who are not correctly logged in'
    });
  }

  return next();
};

exports.default = _default;