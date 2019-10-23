const generate = require('nanoid/generate');

const withShortId = (req, res, next) => {
	const allowedTypes = 'abcdefghijklmnoprstuwvxyz01234567890';
	req.shortId = generate(allowedTypes, 6);

	next();
};

export default withShortId;
