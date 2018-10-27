const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');
const router = Router();

router.get('/', (req, res, next) => {
	const beverages = [];

	db.getDb()
		.db()
		.collection('beverages')
		.find()
		.forEach((beverage) => {
			beverage.container.value = beverage.container.value.toString();
			beverages.push(beverage);
		})
		.then((result) => {
			console.log('result', result);
			res
				.status(200)
				.json(beverages);
		})
		.catch((err) => {
			console.log('Error!', err);
			res
				.status(500)
				.json({ message: 'An error occured' });
		});
});

module.exports = router;
