const Router = require('express').Router;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

const db = require('../db');
const router = Router();

router.get('/', (req, res, next) => {
	const institutions = [];

	db.getDb()
		.db()
		.collection('institutions')
		.find()
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

router.get('/:id', (req, res, next) => {
	db.getDb()
		.db()
		.collection('institutions')
		.findOne({ _id: new ObjectId(req.params.id) })
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
});

module.exports = router;
