"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  Router
} = require('express');

const Place = require("../models/Place");

const shortIdGenerator = require("../utils/shortIdGenerator");

const {
  isAuth
} = require("../utils");

const router = Router();
/*
 * ------------------------------------------------------------------
 * GET LIST OF PLACES
 */

router.get('/list', (req, res) => {
  Place.aggregate([{
    $project: {
      city: {
        $slice: ['$city', 1]
      },
      _id: 0,
      id: '$_id',
      institution_id: '$institution'
    }
  }, {
    $lookup: {
      from: 'institutions',
      localField: 'institution_id',
      foreignField: '_id',
      as: 'institution'
    }
  }, {
    $unwind: {
      path: '$institution',
      preserveNullAndEmptyArrays: true
    }
  }, {
    $unwind: {
      path: '$city'
    }
  }, {
    $project: {
      city: 1,
      id: 1,
      institution: {
        $slice: ['$institution.name', 1]
      }
    }
  }, {
    $unwind: {
      path: '$institution'
    }
  }, {
    $project: {
      label: {
        $concat: ['$city.value', ' (', '$institution.value', ')']
      },
      value: '$id'
    }
  }, {
    $sort: {
      label: 1
    }
  }]).then(result => {
    res.status(200).json(result);
  }).catch(() => {
    res.status(500).json({
      message: 'An error occured'
    });
  });
});
/*
 * ------------------------------------------------------------------
 * ADD NEW PLACE
 */

router.post('/', isAuth, (req, res) => {
  const {
    city,
    country,
    institution,
    latitude,
    longitude
  } = req.body;
  const place = new Place(_objectSpread({
    city,
    country,
    institution,
    shortId: shortIdGenerator()
  }, latitude && longitude && {
    location: {
      type: 'Point',
      coordinates: [latitude, longitude]
    }
  }));
  place.save().then(result => {
    res.status(200).json(result);
  }).catch(() => {
    res.status(500).json({
      message: 'An error occured'
    });
  });
});
module.exports = router;