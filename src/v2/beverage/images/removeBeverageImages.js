import aws from 'aws-sdk';

import { capPathsToRemove } from './cap';
import { coverPathsToRemove } from './cover';
import { galleryPathsToRemove } from './gallery';

const s3 = new aws.S3({});

const removeBeverageImages = (options, res, cb) => {
	const { badge, brand, shortId } = options;

	const capPaths = capPathsToRemove({ badge, brand, shortId });
	const coverPaths = coverPathsToRemove({ badge, brand, shortId });
	const galleryPaths = galleryPathsToRemove(options);

	const imagesPaths = [...capPaths, ...coverPaths, ...galleryPaths];

	const paths = [
		...imagesPaths,
		{ Key: `${brand}/${badge}/${shortId}` },
		{ Key: `${brand}/${badge}` },
	];

	const params = {
		Bucket: 'land-of-hop-images',
		Delete: {
			Objects: paths,
			Quiet: true,
		},
	};

	s3.deleteObjects(params, (err) => {
		if (err) {
			res
				.status(500)
				.json({ err });
		}

		cb();
	});
};

export default removeBeverageImages;
