const Router = require('express').Router;
const mongodb = require('mongodb');

const verifyToken = require('../utils/verifyToken');
const { addNew, getList } = require('./places/');

const router = Router();
const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

router.get('/list', getList);
router.post('/', verifyToken, addNew);

module.exports = router;
