const fs = require('fs');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const rimraf = require('rimraf');
const sharp = require('sharp');

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

function createForldersInsideContainer(containerDir) {
	const originalImages = `${containerDir}/original`;
	const largeImages = `${containerDir}/2x`;
	const smallImages = `${containerDir}/1x`;
	const largeJpg = `${containerDir}/2x/jpg`;
	const largeWebp = `${containerDir}/2x/webp`;
	const smallJpg = `${containerDir}/1x/jpg`;
	const smallWebp = `${containerDir}/1x/webp`;

	fs.mkdirSync(containerDir);
	fs.mkdirSync(originalImages);
	fs.mkdirSync(largeImages);
	fs.mkdirSync(smallImages);
	fs.mkdirSync(largeJpg);
	fs.mkdirSync(largeWebp);
	fs.mkdirSync(smallJpg);
	fs.mkdirSync(smallWebp);

	return true;
}

function checkIfGalleryExists({ badge, brand, shortId }) {
	return new Promise((resolve) => {
		const brandDir = `images/${brand}`;
		const badgeDir = `images/${brand}/${badge}`;
		const shortIdDir = `images/${brand}/${badge}/${shortId}`;
		const containerDir = `images/${brand}/${badge}/${shortId}/container`;

		checkIfDirectoryExists(brandDir);
		checkIfDirectoryExists(badgeDir);
		checkIfDirectoryExists(shortIdDir);

		if (fs.existsSync(containerDir)) {
			rimraf(containerDir, () => {
				createForldersInsideContainer(containerDir);
				resolve(containerDir);
			});
		} else {
			createForldersInsideContainer(containerDir);
			resolve(containerDir);
		}
	});
}

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		const { badge, brand, shortId } = req.params;
		cb(null, `images/${brand}/${badge}/${shortId}/container/original`);
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

router.post('/beverage/gallery/:shortId/:brand/:badge', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (authErr) => {
		if (authErr) {
			res.sendStatus(403);
		} else {
			checkIfGalleryExists(req.params)
				.then((containerDir) => {
					upload(req, res, () => {
						const actualDirectory = `${containerDir}/original`;

						fs.readdir(actualDirectory, (err, files) => {
							if (err) {
								return false;
							}

							files.forEach((file) => {
								const [fileName] = file.split('.');

								sharp(`${actualDirectory}/${file}`)
									.resize(440)
									.toFile(`${containerDir}/2x/jpg/${fileName}.jpg`);

								sharp(`${actualDirectory}/${file}`)
									.resize(440)
									.toFile(`${containerDir}/2x/webp/${fileName}.webp`);

								sharp(`${actualDirectory}/${file}`)
									.resize(220)
									.toFile(`${containerDir}/1x/jpg/${fileName}.jpg`);

								sharp(`${actualDirectory}/${file}`)
									.resize(220)
									.toFile(`${containerDir}/1x/webp/${fileName}.webp`);
							});

							return true;
						});

						res.end('UPLOAD COMPLETED!');
					});
				});
		}
	});
});

module.exports = router;
