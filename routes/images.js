const fs = require('fs');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const rimraf = require('rimraf');

const Country = require('../models/Country');
const verifyToken = require('../utils/verifyToken');

const router = Router();

/*
 * ------------------------------------------------------------------
 * ADD NEW BEVERAGE GALLERY IMAGES
 */

function checkIfDirectoryExists(directory) {
	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory);
	}
}

function checkIfGalleryExists({ badge, brand, shortId }) {
	return new Promise((resolve) => {
		const brandDir = `images/${brand}`;
		const badgeDir = `images/${brand}/${badge}`;
		const shortIdDir = `images/${brand}/${badge}/${shortId}`;
		const containerDir = `images/${brand}/${badge}/${shortId}/container`;
		const largeImages = `images/${brand}/${badge}/${shortId}/container/2x`;
		const smallImages = `images/${brand}/${badge}/${shortId}/container/1x`;

		checkIfDirectoryExists(brandDir);
		checkIfDirectoryExists(badgeDir);
		checkIfDirectoryExists(shortIdDir);

		if (fs.existsSync(containerDir)) {
			rimraf(containerDir, () => {
				fs.mkdirSync(containerDir);
				fs.mkdirSync(largeImages);
				fs.mkdirSync(smallImages);
				resolve();
			});
		} else {
			fs.mkdirSync(containerDir);
			fs.mkdirSync(largeImages);
			fs.mkdirSync(smallImages);
			resolve();
		}
	});
}

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		const { badge, brand, shortId } = req.params;
		const largeImages = `images/${brand}/${badge}/${shortId}/container/2x`;

		cb(null, largeImages);
	},
	filename: (req, file, cb) => {
		cb(null, req.files.length < 10 ? `0${req.files.length}.jpg` : `${req.files.length}.jpg`);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage: fileStorage, fileFilter }).array('image');

router.post('/beverage/gallery/:shortId/:brand/:badge', (req, res) => {
	checkIfGalleryExists(req.params)
		.then(() => {
			upload(req, res, () => {
				res.end('UPLOAD COMPLETED!');
			});
		});
});

module.exports = router;
