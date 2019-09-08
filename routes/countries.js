const { Router } = require('express');

const Country = require('../models/Country');
const { isAuth } = require('../utils');

const router = Router();

/*
 * ------------------------------------------------------------------
 * GET LIST OF COUNTRIES
 */

router.get('/list/:lang', (req, res) => {
	Country
		.aggregate([
			{
				$project: {
					_id: 0,
					value: '$_id',
					name: 1,
				},
			},
			{
				$unwind: '$name',
			},
			{
				$match: {
					'name.language': req.params.lang,
				},
			},
			{
				$project: {
					value: 1,
					label: '$name.value',
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
 * ADD NEW COUNTRY
 */

router.post('/', isAuth, (req, res) => {
	const country = new Country(req.body);

	country
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
