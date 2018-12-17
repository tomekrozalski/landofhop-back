const Router = require('express').Router;
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');

const db = require('../db');
const verifyToken = require('../utils/verifyToken');

const router = Router();
const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

router.get('/', (req, res, next) => {
	const countries = [];

	db.getDb()
		.db()
		.collection('countries')
		.find()
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

router.get('/basics', (req, res, next) => {
	const countries = [];

	db.getDb()
		.db()
		.collection('countries')
		.aggregate([
			{
				$project: {
					_id: 0,
					label: '$name.pl',
					value: '$_id'
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

module.exports = router;
