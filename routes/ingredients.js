const Router = require('express').Router;
const jwt = require('jsonwebtoken');

const db = require('../db');
const verifyToken = require('../utils/verifyToken');

const router = Router();

router.get('/list', (req, res) => {
	const ingredients = [];

	db.getDb()
		.collection('ingredients')
		.aggregate([
			{
				$project: {
					_id: 0,
					id: '$_id',
					name: {
						$slice: ['$name', 1],
					},
					type: 1,
				}
			},
			{ 
				$unwind: '$name'
			},
			{
				$project: {
					value: '$id',
					label: '$name.value',
					type: 1,
				}
			},
		])
		.forEach((ingredient) => {
			ingredients.push(ingredient);
		})
		.then((result) => {
			res
				.status(200)
				.json(ingredients);
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
				.collection('ingredients')
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
