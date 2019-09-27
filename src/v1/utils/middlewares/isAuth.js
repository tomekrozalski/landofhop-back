import jwt from 'jsonwebtoken';
import get from 'lodash/get';

export default (req, res, next) => {
	if (!get(req, 'headers.authorization')) {
		return res.status(403).end();
	}

	const token = req.headers.authorization.split(' ')[1];

	return jwt.verify(token, process.env.JWT_SECRET, (err) => {
		if (err) {
			res.status(403).end();
		} else {
			next();
		}
	});
};
