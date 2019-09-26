"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _cap = require("./cap");

var _cover = require("./cover");

var _gallery = require("./gallery");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const s3 = new _awsSdk.default.S3({});

const removeBeverageImages = (options, res, cb) => {
  const {
    badge,
    brand,
    shortId
  } = options;
  const capPaths = (0, _cap.capPathsToRemove)({
    badge,
    brand,
    shortId
  });
  const coverPaths = (0, _cover.coverPathsToRemove)({
    badge,
    brand,
    shortId
  });
  const galleryPaths = (0, _gallery.galleryPathsToRemove)(options);
  const imagesPaths = [...capPaths, ...coverPaths, ...galleryPaths];
  const paths = [...imagesPaths, {
    Key: `${brand}/${badge}/${shortId}`
  }, {
    Key: `${brand}/${badge}`
  }];
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

var _default = removeBeverageImages;
exports.default = _default;