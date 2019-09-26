"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _sharp = _interopRequireDefault(require("sharp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const s3 = new _awsSdk.default.S3({});

function saveCap(buffer, capPath, cb) {
  (0, _sharp.default)(buffer).jpeg({}).resize(440).toBuffer((err, data) => {
    s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${capPath}/jpg/4x.jpg`,
      Body: data,
      ACL: 'public-read'
    }, () => {});
  });
  (0, _sharp.default)(buffer).jpeg({}).resize(220).toBuffer(async (err, data) => {
    await s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${capPath}/jpg/2x.jpg`,
      Body: data,
      ACL: 'public-read'
    }, cb);
  });
  (0, _sharp.default)(buffer).jpeg({}).resize(110).toBuffer((err, data) => {
    s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${capPath}/jpg/1x.jpg`,
      Body: data,
      ACL: 'public-read'
    }, () => {});
  });
  (0, _sharp.default)(buffer).webp({}).resize(440).toBuffer((err, data) => {
    s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${capPath}/webp/4x.webp`,
      Body: data,
      ACL: 'public-read'
    }, () => {});
  });
  (0, _sharp.default)(buffer).webp({}).resize(220).toBuffer((err, data) => {
    s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${capPath}/webp/2x.webp`,
      Body: data,
      ACL: 'public-read'
    }, () => {});
  });
  (0, _sharp.default)(buffer).webp({}).resize(110).toBuffer((err, data) => {
    s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${capPath}/webp/1x.webp`,
      Body: data,
      ACL: 'public-read'
    }, () => {});
  });
}

var _default = saveCap;
exports.default = _default;