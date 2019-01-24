const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');
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
					id: '$_id',
					name: 1
				}
			},
			{
				$sort: { name : 1 }
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

module.exports = router;
