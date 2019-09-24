"use strict";

const sharp = require('sharp');

const aws = require('aws-sdk');

const s3 = new aws.S3({});

function saveCap(buffer, capPath, cb) {
  sharp(buffer).jpeg({}).resize(440).toBuffer((err, data) => {
    s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${capPath}/jpg/4x.jpg`,
      Body: data,
      ACL: 'public-read'
    }, () => {});
  });
  sharp(buffer).jpeg({}).resize(220).toBuffer(async (err, data) => {
    await s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${capPath}/jpg/2x.jpg`,
      Body: data,
      ACL: 'public-read'
    }, cb);
  });
  sharp(buffer).jpeg({}).resize(110).toBuffer((err, data) => {
    s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${capPath}/jpg/1x.jpg`,
      Body: data,
      ACL: 'public-read'
    }, () => {});
  });
  sharp(buffer).webp({}).resize(440).toBuffer((err, data) => {
    s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${capPath}/webp/4x.webp`,
      Body: data,
      ACL: 'public-read'
    }, () => {});
  });
  sharp(buffer).webp({}).resize(220).toBuffer((err, data) => {
    s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${capPath}/webp/2x.webp`,
      Body: data,
      ACL: 'public-read'
    }, () => {});
  });
  sharp(buffer).webp({}).resize(110).toBuffer((err, data) => {
    s3.upload({
      Bucket: 'land-of-hop-images',
      Key: `${capPath}/webp/1x.webp`,
      Body: data,
      ACL: 'public-read'
    }, () => {});
  });
}

module.exports = saveCap;