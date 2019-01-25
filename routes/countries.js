const Router = require('express').Router;
const jwt = require('jsonwebtoken');

const db = require('../db');
const verifyToken = require('../utils/verifyToken');

const router = Router();

router.get('/list/:lang', (req, res, next) => {
	const countries = [];

	db.getDb()
		.db()
		.collection('countries')
		.aggregate([
			{
				$project: {
					_id: 0,
					value: '$_id',
					name: 1
				}
			},
			{ 
				$unwind: '$name'
			},
			{
				$match: {
					'name.language': req.params.lang
				}
			},
			{
				$project: {
					value: 1,
					label: '$name.value'
				}
			},
			{
				$sort: { label : 1 }
			}
		])
		.forEach((country) => {
			console.log('country', country);
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
