import bcrypt from 'bcryptjs';

import User from '../auth.model';

const login = (req, res) => {
	const { email, password } = req.body;

	User
		.findOne({ email })
		.then((user) => {
			if (!user) {
				return res
					.status(404)
					.json({ message: `User with the email address: ${email} not found` });
			}

			return bcrypt.compare(password, user.password)
				.then((doMatch) => {
					if (!doMatch) {
						res
							.status(400)
							.json({ message: 'Authentication failed, invalid password' });
					}

					req.session.isLoggedIn = true;
					req.session.user = user;

					res
						.status(200)
						.json({
							message: 'Authentication succeeded',
						});
				})
				.catch(() => {
					res
						.status(500)
						.json({ message: 'Decryption failed' });
				});
		})
		.catch(() => {
			res
				.status(401)
				.json({ message: 'Authentication failed, invalid username or password' });
		});
};

export default login;
