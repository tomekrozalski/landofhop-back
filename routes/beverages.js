const Router = require('express').Router;
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');

const db = require('../db');
const verifyToken = require('../utils/verifyToken');

const router = Router();
const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

router.get('/', (req, res) => {
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
			res
				.status(200)
				.json(beverages);
		})
		.catch((err) => {
			res
				.status(500)
				.json({ message: 'An error occured' });
		});
});

router.get('/basics', (req, res) => {
	const beverages = [];

	db.getDb()
		.db()
		.collection('beverages')
		.aggregate([
			{
				$project: {
					_id: 0,
					badge: 1,
					brand: '$label.brand',
					id: '$_id',
					name: '$label.name'
				}
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'brand',
					foreignField: '_id',
					as: 'brand_info'
				}
			},
			{
				$unwind: "$brand_info"
			},
			{
				$project: {
					badge: 1,
					id: 1,
					name: 1,
					brand: 0,
					brand: {
						badge: '$brand_info.badge',
						name: '$brand_info.name'
					}
				}
			},

		])
		.forEach((beverage) => {
			beverages.push(beverage);
		})
		.then((result) => {
			res
				.status(200)
				.json(beverages);
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

			const newBeverage = {
				badge: "test-badge",
				label: {
					name: "test name",
					brand: ObjectId("5bbd04bc5433eca56a6c00cf")
				},
				container: {
					color: "brown",
					material: "glass",
					unit: "ml",
					type: "bottle",
					value: Decimal128.fromString("500")
				},
				added: new Date()
			};

			db.getDb()
				.db()
				.collection('beverages')
				.insertOne(newBeverage)
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
