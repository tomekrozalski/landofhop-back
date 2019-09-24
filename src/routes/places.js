const { Router } = require('express');

const Place = require('../models/Place');
const shortIdGenerator = require('../utils/shortIdGenerator');
const { isAuth } = require('../utils');

const router = Router();

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
					institution_id: '$institution',
				},
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'institution_id',
					foreignField: '_id',
					as: 'institution',
				},
			},
			{
				$unwind: {
					path: '$institution',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$unwind: {
					path: '$city',
				},
			},
			{
				$project: {
					city: 1,
					id: 1,
					institution: {
						$slice: ['$institution.name', 1],
					},
				},
			},
			{
				$unwind: {
					path: '$institution',
				},
			},
			{
				$project: {
					label: {
						$concat: ['$city.value', ' (', '$institution.value', ')'],
					},
					value: '$id',
				},
			},
			{
				$sort: { label: 1 },
			},
		])
		.then((result) => {
			res
				.status(200)
				.json(result);
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'An error occured' });
		});
});

/*
 * ------------------------------------------------------------------
 * ADD NEW PLACE
 */

router.post('/', isAuth, (req, res) => {
	const {
		city,
		country,
		institution,
		latitude,
		longitude,
	} = req.body;

	const place = new Place({
		city,
		country,
		institution,
		shortId: shortIdGenerator(),
		...(latitude && longitude && {
			location: {
				type: 'Point',
				coordinates: [
					latitude,
					longitude,
				],
			},
		}),
	});

	place
		.save()
		.then((result) => {
			res
				.status(200)
				.json(result);
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'An error occured' });
		});
});

module.exports = router;
