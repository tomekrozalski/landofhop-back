const generate = require('nanoid/generate');

const shortIdGenerator = () => {
	const allowedTypes = 'abcdefghijklmnoprstuwvxyz01234567890';
	return generate(allowedTypes, 10);
}

module.exports = shortIdGenerator;
