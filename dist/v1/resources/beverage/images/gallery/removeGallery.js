"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _galleryPathsToRemove = _interopRequireDefault(require("./galleryPathsToRemove"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const s3 = new _awsSdk.default.S3({});

const removeGallery = (options, res, cb) => {
  const paths = (0, _galleryPathsToRemove.default)(options);
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

var _default = removeGallery;
exports.default = _default;