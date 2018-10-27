const Router = require('express').Router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../db');

const router = Router();

const createToken = () => {
	return jwt.sign({}, 'hophead', { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
	const bearerHeader = req.headers['authorization'];

	if (typeof bearerHeader !== 'undefined') {
		req.token = bearerHeader.split(' ')[1];
		next();
	} else {
		res
			.status(403)
			.json({ message: 'Access forbidden' });
	}
};

router.get('/test', verifyToken, (req, res) => {
	jwt.verify(req.token, 'hophead', (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			res
				.status(200)
				.json({
					message: 'Test dziala! :D',
					authData,
				});
		}
	});
});

router.post('/login', (req, res, next) => {
	const email = req.body.email;
	const pw = req.body.password;

	db.getDb()
		.db()
		.collection('users')
		.findOne({ email })
		.then((userDoc) => {
			console.log('userDoc', pw, userDoc.password);
			return bcrypt.compare(pw, userDoc.password)
		})
		.then((result) => {
			if (!result) {
				throw Error();
			}

			const token = createToken();

			res
				.status(200)
				.json({
					message: 'Authentication succeeded.',
					token,
				});
		})
		.catch((err) => {
			res
				.status(401)
				.json({ message: 'Authentication failed, invalid username or password.' });
		});
});

router.post('/signup', (req, res, next) => {
	const email = req.body.email;
	const pw = req.body.password;

	bcrypt
		.hash(pw, 12)
		.then(hashedPW => {
			db.getDb()
				.db()
				.collection('users')
				.insertOne({
					email: email,
					password: hashedPW,
				})
				.then((result) => {
					console.log('result', result);

					const token = createToken();
					res
						.status(201)
						.json({ token, user: { email } });
				})
				.catch((err) => {
					console.log(err);
					res.status(500).json({ message: 'Creating the user failed.' });
				});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Creating the user failed.' });
		});
});

module.exports = router;
