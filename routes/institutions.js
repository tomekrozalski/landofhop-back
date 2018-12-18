const Router = require('express').Router;
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');

const ObjectId = mongodb.ObjectId;

const db = require('../db');
const verifyToken = require('../utils/verifyToken');

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

router.get('/basics', (req, res) => {
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

router.post('/', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			db.getDb()
				.db()
				.collection('institutions')
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
