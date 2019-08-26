const sharp = require('sharp');
const aws = require('aws-sdk');

const s3 = new aws.S3({});

function saveGallery(files, params, cb) {
	files.forEach((file, i) => {
		const properIndex = i + 1;
		const fileName = properIndex < 10 ? `0${properIndex}` : properIndex;
		const { badge, brand, shortId } = params;
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
					if (files.length === properIndex) {
						cb();
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

module.exports = saveGallery;
