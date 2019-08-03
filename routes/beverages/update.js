const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const db = require('../../db');
const normalizeBeverageToRequest = require('../../normalizers/toRequest/beverage');

const ObjectId = mongodb.ObjectId;

const update = (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			const updatedBeverage = normalizeBeverageToRequest(req.body);

			db.getDb()
				.collection('beverages')
				.replaceOne(
					{ _id: new ObjectId(req.body.id) },
					updatedBeverage,
				)
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
};

module.exports = update;
