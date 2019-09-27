import bcrypt from 'bcryptjs';

import { createToken } from 'utils/functions';
import User from '../auth.model';

const login = (req, res) => {
	const { email, password } = req.body;

	User
		.findOne({ email })
		.exec()
		.then((user) => {
			if (!user) {
				return res
					.status(404)
					.json({ message: `User with the email address: ${email} not found` });
			}

			return bcrypt.compare(password, user.password)
				.then((doMatch) => {
					if (!doMatch) {
						return res
							.status(400)
							.json({ message: 'Authentication failed, invalid password' });
					}

					// eslint-disable-next-line no-underscore-dangle
					const token = createToken(user._id);

					return res
						.status(200)
						.json({
							message: 'Authentication succeeded',
							token,
						});
				})
				.catch(() => {
					res
						.status(500)
						.json({ message: 'Decryption failed' });
				});
		});
};

export default login;
