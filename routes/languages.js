const Router = require('express').Router;
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const nanoid = require('nanoid');

const db = require('../db');
const verifyToken = require('../utils/verifyToken');

const router = Router();

router.get('/', (req, res, next) => {
	const languages = [];

	db.getDb()
		.db()
		.collection('languages')
		.aggregate([
			{
				$project: {
					code: 1,
					_id: 0,
					name: 1,
				}
			},
			{
				$sort: { 'name.pl': 1 }
			}
		])
		.forEach((language) => {
			languages.push(language);
		})
		.then((result) => {
			res
				.status(200)
				.json(languages);
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
				.collection('languages')
				.insertOne({
					nanoId: nanoid(6),
					...req.body
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
