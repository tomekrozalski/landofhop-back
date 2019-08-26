const sharp = require('sharp');
const aws = require('aws-sdk');

const s3 = new aws.S3({});

function saveCover(buffer, coverPath, cb) {
	sharp(buffer)
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

	sharp(buffer)
		.flatten({ background: { r: 255, g: 255, b: 255 } })
		.jpeg({})
		.resize(440)
		.toBuffer(async (err, data) => {
			await s3.upload({
				Bucket: 'land-of-hop-images',
				Key: `${coverPath}/jpg/2x.jpg`,
				Body: data,
				ACL: 'public-read',
			}, cb);
		});

	sharp(buffer)
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

	sharp(buffer)
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

	sharp(buffer)
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

	sharp(buffer)
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

module.exports = saveCover;
