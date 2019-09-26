"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _middlewares = require("../../utils/middlewares");

var _controllers = require("./controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
const upload = (0, _multer.default)({});
router.route('/').get(_controllers.getMany).post(_middlewares.isAuth, _middlewares.withShortId, _controllers.saveOne).put(_middlewares.isAuth, _controllers.updateOne).delete(_middlewares.isAuth, _controllers.deleteOne);
router.get('/:shortId/:brand/:badge', _controllers.getOne);
router.post('/cover', _middlewares.isAuth, upload.single('image'), _controllers.saveCoverImage);
router.route('/gallery').post(_middlewares.isAuth, upload.array('image'), _controllers.saveGalleryImages).delete(_middlewares.isAuth, _controllers.deleteGalleryImages);
router.route('/cap').post(_middlewares.isAuth, upload.single('image'), _controllers.saveCapImage).delete(_middlewares.isAuth, _controllers.deleteCapImage);
var _default = router;
exports.default = _default;