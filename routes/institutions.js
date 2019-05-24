const Router = require('express').Router;
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const nanoid = require('nanoid');

const db = require('../db');
const verifyToken = require('../utils/verifyToken');

const ObjectId = mongodb.ObjectId;
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
					badge: 1,
					name: {
						$slice: ['$name', 1],
					},
					value: '$_id',
				}
			},
			{
				$unwind: {
					path: '$name',
				}
			},
			{
				$project: {
					badge: 1,
					label: '$name.value',
					value: 1,
				}
			},
			{
				$sort: { name : 1 }
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
			const newInstitution = {
				...req.body,
				shortId: nanoid(6),
			};

			if (newInstitution.consortium) {
				newInstitution.consortium = new ObjectId(newInstitution.consortium);
			};

			db.getDb()
				.db()
				.collection('institutions')
				.insertOne(newInstitution)
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
