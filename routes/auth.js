const Router = require('express').Router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../db');
const verifyToken = require('../utils/verifyToken');

const router = Router();

const createToken = () => {
	return jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '12h' });
};

router.post('/auth', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			res
				.status(200)
				.json({ message: 'Authentication succeeded' });
		}
	});
});

router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	db.getDb()
		.db()
		.collection('users')
		.findOne({ email })
		.then(user => bcrypt.compare(password, user.password))
		.then((result) => {
			if (!result) {
				throw Error();
			}

			const token = createToken();
			res
				.status(200)
				.json({
					message: 'Authentication succeeded',
					token,
				});
		})
		.catch((err) => {
			res
				.status(401)
				.json({ message: 'Authentication failed, invalid username or password' });
		});
});

router.post('/signup', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	bcrypt
		.hash(password, 12)
		.then(hashedPassword => {
			db.getDb()
				.db()
				.collection('users')
				.insertOne({
					email: email,
					password: hashedPassword,
				})
				.then((result) => {
					const token = createToken();
					res
						.status(201)
						.json({ token });
				})
				.catch((err) => {
					res
						.status(500)
						.json({ message: 'Creating the user failed. Probably the email address is already taken' });
				});
		})
		.catch(err => {
			res
				.status(500)
				.json({ message: 'Creating the user failed' });
		});
});

module.exports = router;
