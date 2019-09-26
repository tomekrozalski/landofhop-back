"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _capPathsToRemove = _interopRequireDefault(require("./capPathsToRemove"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const s3 = new _awsSdk.default.S3({});

const removeCap = ({
  badge,
  brand,
  shortId
}, res, cb) => {
  const paths = (0, _capPathsToRemove.default)({
    badge,
    brand,
    shortId
  });
  const params = {
    Bucket: 'land-of-hop-images',
    Delete: {
      Objects: paths,
      Quiet: true
    }
  };
  s3.deleteObjects(params, err => {
    if (err) {
      res.status(500).json({
        err
      });
    }

    cb();
  });
};

var _default = removeCap;
exports.default = _default;