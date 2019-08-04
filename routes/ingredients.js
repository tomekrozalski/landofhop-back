const { Router } = require('express');
const jwt = require('jsonwebtoken');

const Ingredient = require('../models/Ingredient');
const verifyToken = require('../utils/verifyToken');

const router = Router();

/*
 * ------------------------------------------------------------------
 * GET LIST OF INGREDIENTS
 */

router.get('/list', (req, res) => {
	Ingredient
		.aggregate([
			{
				$project: {
					_id: 0,
					id: '$_id',
					name: {
						$slice: ['$name', 1],
					},
					type: 1,
				},
			},
			{
				$unwind: '$name',
			},
			{
				$project: {
					value: '$id',
					label: '$name.value',
					type: 1,
				},
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
 * ADD NEW INGREDIENT
 */

router.post('/', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err) => {
		if (err) {
			res.sendStatus(403);
		} else {
			const ingredient = new Ingredient(req.body);

			ingredient
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
		}
	});
});

module.exports = router;
