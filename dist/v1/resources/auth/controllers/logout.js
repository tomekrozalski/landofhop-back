"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

var _default = logout;
exports.default = _default;