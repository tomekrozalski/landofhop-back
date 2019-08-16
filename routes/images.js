const { Router } = require('express');
const aws = require('aws-sdk');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const sharp = require('sharp');

const verifyToken = require('../utils/verifyToken');

const router = Router();

aws.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: 'eu-central-1',
});

const s3 = new aws.S3({});

/*
 * ------------------------------------------------------------------
 * ADD NEW BEVERAGE GALLERY IMAGES
 */

const upload = multer({});

router.post('/beverage/gallery/:shortId/:brand/:badge', verifyToken, upload.array('image'), (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (authErr) => {
		if (authErr) {
			res.sendStatus(403);
		} else {
			req.files.forEach((file, i) => {
				const properIndex = i + 1;
				const fileName = properIndex < 10 ? `0${properIndex}` : properIndex;
				const { badge, brand, shortId } = req.params;
				const containerPath = `${brand}/${badge}/${shortId}/container`;

				sharp(file.buffer)
					.jpeg({})
					.resize(880)
					.toBuffer((err, data) => {
						s3.upload({
							Bucket: 'land-of-hop-images',
							Key: `${containerPath}/jpg/4x/${fileName}.jpg`,
							Body: data,
							ACL: 'public-read',
						}, () => {});
					});

				sharp(file.buffer)
					.jpeg({})
					.resize(440)
					.toBuffer(async (err, data) => {
						await s3.upload({
							Bucket: 'land-of-hop-images',
							Key: `${containerPath}/jpg/2x/${fileName}.jpg`,
							Body: data,
							ACL: 'public-read',
						}, () => {
							if (req.files.length === properIndex) {
								res.json({ success: true });
							}
						});
					});

				sharp(file.buffer)
					.jpeg({})
					.resize(220)
					.toBuffer((err, data) => {
						s3.upload({
							Bucket: 'land-of-hop-images',
							Key: `${containerPath}/jpg/1x/${fileName}.jpg`,
							Body: data,
							ACL: 'public-read',
						}, () => {});
					});


				sharp(file.buffer)
					.webp({})
					.resize(880)
					.toBuffer((err, data) => {
						s3.upload({
							Bucket: 'land-of-hop-images',
							Key: `${containerPath}/webp/4x/${fileName}.webp`,
							Body: data,
							ACL: 'public-read',
						}, () => {});
					});

				sharp(file.buffer)
					.webp({})
					.resize(440)
					.toBuffer((err, data) => {
						s3.upload({
							Bucket: 'land-of-hop-images',
							Key: `${containerPath}/webp/2x/${fileName}.webp`,
							Body: data,
							ACL: 'public-read',
						}, () => {});
					});

				sharp(file.buffer)
					.webp({})
					.resize(220)
					.toBuffer((err, data) => {
						s3.upload({
							Bucket: 'land-of-hop-images',
							Key: `${containerPath}/webp/1x/${fileName}.webp`,
							Body: data,
							ACL: 'public-read',
						}, () => {});
					});
			});
		}
	});
});

/*
 * ------------------------------------------------------------------
 * XXX
 */

// const rootImages = 'public/images/beverages/';

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
// 			const upload = multer({
// 				storage: multerS3({
// 					s3,
// 					bucket: 'land-of-hop-images',
// 					acl: 'public-read',
// 					contentType(req, file, cb) {
// 						cb(null, file.mimetype);
// 					},
// 					key(req, file, cb) {
// 						console.log('req.files', req.files);
// 						cb(null, req.files.length < 10 ? `mistrzu/jasne/0${req.files.length}.jpg` : `mistrzu/ciemne/${req.files.length}.jpg`);
// 					},
// 				}),
// 			});

// 			router.post('/upload', upload.array('photos'), (req, res) => {
// 				res.json({ success: req.files });
// 			});


// 			upload(req, res, () => {
// 				const actualDirectory = `${containerDir}/original`;

// 				fs.readdir(actualDirectory, (err, files) => {
// 					if (err) {
// 						return false;
// 					}

// 					files.forEach((file) => {
// 						const [fileName] = file.split('.');

// 						sharp(`${actualDirectory}/${file}`)
// 							.resize(440)
// 							.toFile(`${containerDir}/2x/jpg/${fileName}.jpg`);

// 						sharp(`${actualDirectory}/${file}`)
// 							.resize(440)
// 							.toFile(`${containerDir}/2x/webp/${fileName}.webp`);

// 						sharp(`${actualDirectory}/${file}`)
// 							.resize(220)
// 							.toFile(`${containerDir}/1x/jpg/${fileName}.jpg`);

// 						sharp(`${actualDirectory}/${file}`)
// 							.resize(220)
// 							.toFile(`${containerDir}/1x/webp/${fileName}.webp`);
// 					});

// 					return true;
// 				});

// 				res.end('UPLOAD COMPLETED!');
// 			});
// 		}
// 	});
// });

/*
 * ------------------------------------------------------------------
 * REMOVE BEVERAGE GALLERY IMAGES
 */

function generatePathsToRemove({
	badge,
	brand,
	files,
	shortId,
}) {
	const paths = [];

	Array(files).fill('').forEach((value, i) => {
		const properIndex = i + 1;
		const fileName = properIndex < 10 ? `0${properIndex}` : properIndex;

		paths.push(
			{ Key: `${brand}/${badge}/${shortId}/container/jpg/4x/${fileName}.jpg` },
			{ Key: `${brand}/${badge}/${shortId}/container/jpg/2x/${fileName}.jpg` },
			{ Key: `${brand}/${badge}/${shortId}/container/jpg/1x/${fileName}.jpg` },
			{ Key: `${brand}/${badge}/${shortId}/container/webp/4x/${fileName}.webp` },
			{ Key: `${brand}/${badge}/${shortId}/container/webp/2x/${fileName}.webp` },
			{ Key: `${brand}/${badge}/${shortId}/container/webp/1x/${fileName}.webp` },
		);

		if (properIndex === files) {
			paths.push(
				{ Key: `${brand}/${badge}/${shortId}/container/jpg/4x` },
				{ Key: `${brand}/${badge}/${shortId}/container/jpg/2x` },
				{ Key: `${brand}/${badge}/${shortId}/container/jpg/1x` },
				{ Key: `${brand}/${badge}/${shortId}/container/webp/4x` },
				{ Key: `${brand}/${badge}/${shortId}/container/webp/2x` },
				{ Key: `${brand}/${badge}/${shortId}/container/webp/1x` },
				{ Key: `${brand}/${badge}/${shortId}/container/jpg` },
				{ Key: `${brand}/${badge}/${shortId}/container/webp` },
				{ Key: `${brand}/${badge}/${shortId}/container` },
			);
		}
	});

	return paths;
}

router.delete('/beverage/gallery', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (authErr) => {
		if (authErr) {
			res.sendStatus(403);
		} else {
			const paths = generatePathsToRemove(req.body);

			const params = {
				Bucket: 'land-of-hop-images',
				Delete: {
					Objects: paths,
					Quiet: true,
				},
			};

			s3.deleteObjects(params, (err, data) => {
				if (err) {
					res
						.status(500)
						.json({ err });
				}

				res
					.status(200)
					.json({ data });
			});
		}
	});
});

module.exports = router;
