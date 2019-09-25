export default (req, res, next) => {
	if (!req.session.isLoggedIn) {
		return res
			.status(403)
			.json({ message: 'Path forbidden for users who are not correctly logged in' });
	}

	return next();
};
