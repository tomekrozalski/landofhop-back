const Router = require('express').Router;
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');

const db = require('../db');
const verifyToken = require('../utils/verifyToken');

const router = Router();

router.get('/', (req, res, next) => {
	const countries = [];

	db.getDb()
		.db()
		.collection('countries')
		.aggregate([
			{
				$project: {
					code: 1,
					_id: 0,
					id: '$_id',
					name: 1
				}
			},
			{
				$sort: { name : 1 }
			}
		])
		.forEach((country) => {
			countries.push(country);
		})
		.then((result) => {
			res
				.status(200)
				.json(countries);
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
				.collection('countries')
				.insertOne(req.body)
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
