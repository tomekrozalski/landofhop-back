"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _sharp = _interopRequireDefault(require("sharp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const s3 = new _awsSdk.default.S3({});

function saveCover(buffer, coverPath, cb) {
  (0, _sharp.default)(buffer).jpeg({}).resize(880).toBuffer((err, data) => {
    s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${coverPath}/jpg/4x.jpg`,
      Body: data,
      ACL: 'public-read'
    }, () => {});
  });
  (0, _sharp.default)(buffer).jpeg({}).resize(440).toBuffer(async (err, data) => {
    await s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${coverPath}/jpg/2x.jpg`,
      Body: data,
      ACL: 'public-read'
    }, cb);
  });
  (0, _sharp.default)(buffer).jpeg({}).resize(220).toBuffer((err, data) => {
    s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${coverPath}/jpg/1x.jpg`,
      Body: data,
      ACL: 'public-read'
    }, () => {});
  });
  (0, _sharp.default)(buffer).webp({}).resize(880).toBuffer((err, data) => {
    s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${coverPath}/webp/4x.webp`,
      Body: data,
      ACL: 'public-read'
    }, () => {});
  });
  (0, _sharp.default)(buffer).webp({}).resize(440).toBuffer((err, data) => {
    s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${coverPath}/webp/2x.webp`,
      Body: data,
      ACL: 'public-read'
    }, () => {});
  });
  (0, _sharp.default)(buffer).webp({}).resize(220).toBuffer((err, data) => {
    s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${coverPath}/webp/1x.webp`,
      Body: data,
      ACL: 'public-read'
    }, () => {});
  });
}

var _default = saveCover;
exports.default = _default;