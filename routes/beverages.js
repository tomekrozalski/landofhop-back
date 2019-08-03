const Router = require('express').Router;
const verifyToken = require('../utils/verifyToken');
const { addNew, getDetails, getList, remove, update } = require('./beverages/index');

const router = Router();

router.get('/list', getList);
router.get('/details/:shortId/:brand/:badge', getDetails);
router.post('/', verifyToken, addNew);
router.put('/', verifyToken, update);
router.delete('/', verifyToken, remove);

module.exports = router;
