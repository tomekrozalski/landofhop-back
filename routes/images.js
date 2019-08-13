// const fs = require('fs');
const { Router } = require('express');
const aws = require('aws-sdk');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const multerS3 = require('multer-s3');
// const rimraf = require('rimraf');
const sharp = require('sharp');

const verifyToken = require('../utils/verifyToken');

const router = Router();

aws.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: 'eu-central-1',
});

const s3 = new aws.S3({});

router.delete('/upload', (req, res) => {
	const params = {
		Bucket: 'land-of-hop-images',
		Delete: {
			Objects: [
				{ Key: 'mistrzu/jasne/01.jpg' },
				{ Key: 'mistrzu/jasne/02.jpg' },
				{ Key: 'mistrzu/jasne/03.jpg' },
				{ Key: 'mistrzu/jasne/04.jpg' },
				{ Key: 'mistrzu/jasne/05.jpg' },
				{ Key: 'mistrzu/jasne/06.jpg' },
				{ Key: 'mistrzu/jasne/07.jpg' },
				{ Key: 'mistrzu/jasne/08.jpg' },
				{ Key: 'mistrzu/jasne/09.jpg' },
				{ Key: 'mistrzu/jasne/10.jpg' },
				{ Key: 'mistrzu/jasne' },
			],
			Quiet: true,
		},
	};

	s3.deleteObjects(params, (err, data) => {
		if (err) res.json({ err });
		else res.json({ success: true });
	});
});

/*
 * ------------------------------------------------------------------
 * ADD NEW BEVERAGE GALLERY IMAGES
 */

// const rootImages = 'public/images/beverages/';

// function checkIfDirectoryExists(directory) {
// 	if (!fs.existsSync(directory)) {
// 		fs.mkdirSync(directory);
// 	}
// }

// function createForldersInsideContainer(containerDir) {
// 	const originalImages = `${containerDir}/original`;
// 	const largeImages = `${containerDir}/2x`;
// 	const smallImages = `${containerDir}/1x`;
// 	const largeJpg = `${containerDir}/2x/jpg`;
// 	const largeWebp = `${containerDir}/2x/webp`;
// 	const smallJpg = `${containerDir}/1x/jpg`;
// 	const smallWebp = `${containerDir}/1x/webp`;

// 	fs.mkdirSync(containerDir);
// 	fs.mkdirSync(originalImages);
// 	fs.mkdirSync(largeImages);
// 	fs.mkdirSync(smallImages);
// 	fs.mkdirSync(largeJpg);
// 	fs.mkdirSync(largeWebp);
// 	fs.mkdirSync(smallJpg);
// 	fs.mkdirSync(smallWebp);

// 	return true;
// }

// function checkIfGalleryExists({ badge, brand, shortId }) {
// 	return new Promise((resolve) => {
// 		const brandDir = `${rootImages}/${brand}`;
// 		const badgeDir = `${rootImages}/${brand}/${badge}`;
// 		const shortIdDir = `${rootImages}/${brand}/${badge}/${shortId}`;
// 		const containerDir = `${rootImages}/${brand}/${badge}/${shortId}/container`;

// 		checkIfDirectoryExists(brandDir);
// 		checkIfDirectoryExists(badgeDir);
// 		checkIfDirectoryExists(shortIdDir);

// 		if (fs.existsSync(containerDir)) {
// 			rimraf(containerDir, () => {
// 				createForldersInsideContainer(containerDir);
// 				resolve(containerDir);
// 			});
// 		} else {
// 			createForldersInsideContainer(containerDir);
// 			resolve(containerDir);
// 		}
// 	});
// }

// const fileStorage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		const { badge, brand, shortId } = req.params;
// 		cb(null, `${rootImages}/${brand}/${badge}/${shortId}/container/original`);
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, req.files.length < 10 ? `0${req.files.length}.jpg` : `${req.files.length}.jpg`);
// 	},
// });

// const fileFilter = (req, file, cb) => {
// 	if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
// 		cb(null, true);
// 	} else {
// 		cb(null, false);
// 	}
// };

// const upload = multer({ storage: fileStorage, fileFilter }).array('image');

// router.post('/beverage/gallery/:shortId/:brand/:badge', verifyToken, (req, res) => {
// 	jwt.verify(req.token, process.env.JWT_SECRET, (authErr) => {
// 		if (authErr) {
// 			res.sendStatus(403);
// 		} else {
// 			checkIfGalleryExists(req.params)
// 				.then((containerDir) => {
// 					upload(req, res, () => {
// 						const actualDirectory = `${containerDir}/original`;

// 						fs.readdir(actualDirectory, (err, files) => {
// 							if (err) {
// 								return false;
// 							}

// 							files.forEach((file) => {
// 								const [fileName] = file.split('.');

// 								sharp(`${actualDirectory}/${file}`)
// 									.resize(440)
// 									.toFile(`${containerDir}/2x/jpg/${fileName}.jpg`);

// 								sharp(`${actualDirectory}/${file}`)
// 									.resize(440)
// 									.toFile(`${containerDir}/2x/webp/${fileName}.webp`);

// 								sharp(`${actualDirectory}/${file}`)
// 									.resize(220)
// 									.toFile(`${containerDir}/1x/jpg/${fileName}.jpg`);

// 								sharp(`${actualDirectory}/${file}`)
// 									.resize(220)
// 									.toFile(`${containerDir}/1x/webp/${fileName}.webp`);
// 							});

// 							return true;
// 						});

// 						res.end('UPLOAD COMPLETED!');
// 					});
// 				});
// 		}
// 	});
// });


const upload = multer({
	storage: multerS3({
		s3,
		bucket: 'land-of-hop-images',
		acl: 'public-read',
		contentType(req, file, cb) {
			cb(null, file.mimetype);
		},
		key(req, file, cb) {
			console.log('req.files', req.files);
			cb(null, req.files.length < 10 ? `mistrzu/jasne/0${req.files.length}.jpg` : `mistrzu/ciemne/${req.files.length}.jpg`);
		},
	}),
});

router.post('/upload', upload.array('photos'), (req, res) => {
	res.json({ success: req.files });
});

module.exports = router;
