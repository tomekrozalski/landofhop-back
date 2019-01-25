const Router = require('express').Router;
const jwt = require('jsonwebtoken');
const nanoid = require('nanoid');

const db = require('../db');
const verifyToken = require('../utils/verifyToken');

const router = Router();

router.get('/list', (req, res) => {
	const institutions = [];

	db.getDb()
		.db()
		.collection('institutions')
		.aggregate([
			{
				$project: {
					_id: 0,
					value: '$_id',
					label: '$name.phrase'
				}
			},
			{
				$sort: { label : 1 }
			}
		])
		.forEach((institution) => {
			institutions.push(institution);
		})
		.then((result) => {
			res
				.status(200)
				.json(institutions);
		})
		.catch((err) => {
			res
				.status(500)
				.json({ message: 'An error occured' });
		});
});

router.post('/', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			db.getDb()
				.db()
				.collection('institutions')
				.insertOne({
					short_id: nanoid(6),
					...req.body,
				})
				.then((result) => {
					res
						.status(200)
						.json(result);
				})
				.catch((err) => {
					res
						.status(500)
						.json({ message: 'An error occured' });
				});
		}
	});
});

module.exports = router;
