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
const upload = multer({});

/*
 * ------------------------------------------------------------------
 * ADD NEW BEVERAGE GALLERY IMAGES
 */

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
 * UPDATE BEVERAGE COVER IMAGE
 */

router.post('/beverage/cover/:shortId/:brand/:badge', verifyToken, upload.single('image'), (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (authErr) => {
		if (authErr) {
			res.sendStatus(403);
		} else {
			const { badge, brand, shortId } = req.params;
			const coverPath = `${brand}/${badge}/${shortId}/cover`;

			sharp(req.file.buffer)
				.flatten({ background: { r: 255, g: 255, b: 255 } })
				.jpeg({})
				.resize(880)
				.toBuffer((err, data) => {
					s3.upload({
						Bucket: 'land-of-hop-images',
						Key: `${coverPath}/jpg/4x.jpg`,
						Body: data,
						ACL: 'public-read',
					}, () => {});
				});

			sharp(req.file.buffer)
				.flatten({ background: { r: 255, g: 255, b: 255 } })
				.jpeg({})
				.resize(440)
				.toBuffer(async (err, data) => {
					await s3.upload({
						Bucket: 'land-of-hop-images',
						Key: `${coverPath}/jpg/2x.jpg`,
						Body: data,
						ACL: 'public-read',
					}, () => {
						res.json({ success: true });
					});
				});

			sharp(req.file.buffer)
				.flatten({ background: { r: 255, g: 255, b: 255 } })
				.jpeg({})
				.resize(220)
				.toBuffer((err, data) => {
					s3.upload({
						Bucket: 'land-of-hop-images',
						Key: `${coverPath}/jpg/1x.jpg`,
						Body: data,
						ACL: 'public-read',
					}, () => {});
				});


			sharp(req.file.buffer)
				.webp({})
				.resize(880)
				.toBuffer((err, data) => {
					s3.upload({
						Bucket: 'land-of-hop-images',
						Key: `${coverPath}/webp/4x.webp`,
						Body: data,
						ACL: 'public-read',
					}, () => {});
				});

			sharp(req.file.buffer)
				.webp({})
				.resize(440)
				.toBuffer((err, data) => {
					s3.upload({
						Bucket: 'land-of-hop-images',
						Key: `${coverPath}/webp/2x.webp`,
						Body: data,
						ACL: 'public-read',
					}, () => {});
				});

			sharp(req.file.buffer)
				.webp({})
				.resize(220)
				.toBuffer((err, data) => {
					s3.upload({
						Bucket: 'land-of-hop-images',
						Key: `${coverPath}/webp/1x.webp`,
						Body: data,
						ACL: 'public-read',
					}, () => {});
				});
		}
	});
});

/*
 * ------------------------------------------------------------------
 * REMOVE BEVERAGE GALLERY IMAGES
 */

function generateGalleryImagePathToRemove({
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
			const paths = generateGalleryImagePathToRemove(req.body);

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
