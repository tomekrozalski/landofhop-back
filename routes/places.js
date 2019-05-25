const Router = require('express').Router;
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');

const db = require('../db');
const shortIdGenerator = require('../utils/shortIdGenerator');
const verifyToken = require('../utils/verifyToken');

const router = Router();
const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

router.get('/list', (req, res, next) => {
	const places = [];

	db.getDb()
		.db()
		.collection('places')
		.aggregate([
			{
				$project: {
					city: {
						$slice: ['$city', 1],
					},
					_id: 0,
					id: '$_id',
					institution_id: '$institution'
				}
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'institution_id',
					foreignField: '_id',
					as: 'institution'
				}
			},
			{
				$unwind: {
					path: '$institution',
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$unwind: {
					path: '$city',
				}
			},
			{
				$project: {
					city: 1,
					id: 1,
					institution: {
						$slice: ['$institution.name', 1],
					}
				}
			},
			{
				$unwind: {
					path: '$institution',
				}
			},
			{
				$project: {
					label: {
						$concat: ['$city.value', ' (', '$institution.value', ')']
					},
					value: '$id'
				}
			},
			{
				$sort: { label : 1 }
			}
		])
		.forEach((place) => {
			places.push(place);
		})
		.then((result) => {
			res
				.status(200)
				.json(places);
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

			const {
				city,
				country,
				institution,
				location,
			} = req.body;

			console.log('req.body', req.body);

			const newPlace = {
				city,
				country: new ObjectId(country),
				institution: new ObjectId(institution),
				shortId: shortIdGenerator(),
			};

			if (location) {
				newPlace.location = {
					type: "Point",
					coordinates: [
						Decimal128.fromString(location.latitude),
						Decimal128.fromString(location.longitude),
					]
				}
			}

			db.getDb()
				.db()
				.collection('places')
				.insertOne(newPlace)
				.then((result) => {
					res
						.status(200)
						.json(result);
				})
				.catch((err) => {
					console.log('err', err);
					res
						.status(500)
						.json({ message: 'An error occured' });
				});
		}
	});
});

// router.get('/:id', (req, res, next) => {
// 	db.getDb()
// 		.db()
// 		.collection('places')
// 		.findOne({ _id: new ObjectId(req.params.id) })
// 		.then((result) => {
// 			res
// 				.status(200)
// 				.json(result);
// 		})
// 		.catch((err) => {
// 			res
// 				.status(500)
// 				.json({ message: 'An error occured' });
// 		});
// });

module.exports = router;
