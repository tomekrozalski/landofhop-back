const jwt = require('jsonwebtoken');
const db = require('../../db');
const normalizeBeverageToRequest = require('../../normalizers/toRequest/beverage');
const shortIdGenerator = require('../../utils/shortIdGenerator');

const addNew = (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			const newBeverage = normalizeBeverageToRequest(req.body);
			newBeverage.shortId = shortIdGenerator();

			db.getDb()
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
};

module.exports = addNew;
