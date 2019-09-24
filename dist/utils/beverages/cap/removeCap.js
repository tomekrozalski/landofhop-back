"use strict";

const aws = require('aws-sdk');

const capPathsToRemove = require("./capPathsToRemove");

const s3 = new aws.S3({});

const removeCap = ({
  badge,
  brand,
  shortId
}, res, cb) => {
  const paths = capPathsToRemove({
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

module.exports = removeCap;