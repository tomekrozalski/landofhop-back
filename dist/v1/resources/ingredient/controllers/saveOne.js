"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ingredient = _interopRequireDefault(require("../ingredient.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveOne = (req, res) => {
  const ingredient = new _ingredient.default(req.body);
  ingredient.save().then(result => {
    res.status(200).json(result);
  }).catch(() => {
    res.status(500).json({
      message: 'An error occured'
    });
  });
};

var _default = saveOne;
exports.default = _default;