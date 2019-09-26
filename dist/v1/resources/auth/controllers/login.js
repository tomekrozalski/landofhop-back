"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _auth = _interopRequireDefault(require("../auth.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const login = (req, res) => {
  const {
    email,
    password
  } = req.body;

  _auth.default.findOne({
    email
  }).then(user => {
    if (!user) {
      return res.status(404).json({
        message: `User with the email address: ${email} not found`
      });
    }

    return _bcryptjs.default.compare(password, user.password).then(doMatch => {
      if (!doMatch) {
        res.status(400).json({
          message: 'Authentication failed, invalid password'
        });
      }

      req.session.isLoggedIn = true;
      req.session.user = user;
      res.status(200).json({
        message: 'Authentication succeeded'
      });
    }).catch(() => {
      res.status(500).json({
        message: 'Decryption failed'
      });
    });
  }).catch(() => {
    res.status(401).json({
      message: 'Authentication failed, invalid username or password'
    });
  });
};

var _default = login;
exports.default = _default;