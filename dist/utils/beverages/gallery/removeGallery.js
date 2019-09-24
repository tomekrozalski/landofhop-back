"use strict";

const aws = require('aws-sdk');

const galleryPathsToRemove = require("./galleryPathsToRemove");

const s3 = new aws.S3({});

const removeGallery = (options, res, cb) => {
  const paths = galleryPathsToRemove(options);
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

module.exports = removeGallery;