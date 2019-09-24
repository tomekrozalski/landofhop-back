"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  Router
} = require('express');

const Institution = require('../models/Institution');

const shortIdGenerator = require('../utils/shortIdGenerator');

const {
  isAuth
} = require('../utils');

const router = Router();
/*
 * ------------------------------------------------------------------
 * GET LIST OF INSTITUTIONS
 */

router.get('/list', (req, res) => {
  Institution.aggregate([{
    $project: {
      _id: 0,
      badge: 1,
      name: {
        $slice: ['$name', 1]
      },
      value: '$_id'
    }
  }, {
    $unwind: {
      path: '$name'
    }
  }, {
    $project: {
      badge: 1,
      label: '$name.value',
      value: 1
    }
  }, {
    $sort: {
      name: 1
    }
  }]).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json({
      message: 'An error occured'
    });
  });
});
/*
 * ------------------------------------------------------------------
 * ADD NEW INSTITUTION
 */

router.post('/', isAuth, (req, res) => {
  const {
    badge,
    name,
    website,
    consortium
  } = req.body;
  const place = new Institution(_objectSpread({
    badge,
    name,
    shortId: shortIdGenerator()
  }, website && {
    website
  }, {}, consortium && {
    consortium
  }));
  place.save().then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json({
      message: 'An error occured'
    });
  });
});
module.exports = router;