"use strict";

const aws = require('aws-sdk');

const capPathsToRemove = require('./cap/capPathsToRemove');

const coverPathsToRemove = require('./cover/coverPathsToRemove');

const galleryPathsToRemove = require('./gallery/galleryPathsToRemove');

const s3 = new aws.S3({});

const removeBeverage = (options, res, cb) => {
  const {
    badge,
    brand,
    shortId
  } = options;
  const capPaths = capPathsToRemove({
    badge,
    brand,
    shortId
  });
  const coverPaths = coverPathsToRemove({
    badge,
    brand,
    shortId
  });
  const galleryPaths = galleryPathsToRemove(options);
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

module.exports = removeBeverage;