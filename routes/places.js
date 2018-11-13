const Router = require('express').Router;
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');

const db = require('../db');
const verifyToken = require('../utils/verifyToken');

const router = Router();
const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

router.get('/', (req, res, next) => {
	const places = [];

	db.getDb()
		.db()
		.collection('places')
		.find()
		.forEach((place) => {
			place.location.coordinates = place.location.coordinates.map(item => item.toString());
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
				latitude,
				longitude,
			} = req.body;

			const newPlace = {
				city,
				country,
				location: {
					type: "Point",
					coordinates: [
						Decimal128.fromString(longitude),
						Decimal128.fromString(latitude)
					]
				}
			};

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

router.get('/:id', (req, res, next) => {
	db.getDb()
		.db()
		.collection('places')
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
