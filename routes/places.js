const Router = require('express').Router;
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');

const verifyToken = require('../utils/verifyToken');
const shortIdGenerator = require('../utils/shortIdGenerator');
const Place = require('../models/Place');

const router = Router();
const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

/*
 * ------------------------------------------------------------------
 * GET LIST OF PLACES
 */

router.get('/list', (req, res) => {
	Place
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

/*
 * ------------------------------------------------------------------
 * ADD NEW PLACE
 */

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

			const place = new Place({
				city,
				country,
				institution,
				shortId: shortIdGenerator(),
				...(location && { location: {
					type: 'Point',
					coordinates: [
						Decimal128.fromString(location.latitude),
						Decimal128.fromString(location.longitude),
					]
				}})
			});

			console.log('place', place);

			place
				.save()
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

module.exports = router;
