import aws from 'aws-sdk';
import capPathsToRemove from './capPathsToRemove';

const s3 = new aws.S3({});

const removeCap = ({ badge, brand, shortId }, res, cb) => {
	const paths = capPathsToRemove({ badge, brand, shortId });

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

export default removeCap;
