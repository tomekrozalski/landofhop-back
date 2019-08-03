const jwt = require('jsonwebtoken');
const db = require('../../db');
const shortIdGenerator = require('../../utils/shortIdGenerator');

const addNew = (req, res) => {
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

			const newPlace = {
				city,
				country: new ObjectId(country),
				institution: new ObjectId(institution),
				shortId: shortIdGenerator(),
			};

			if (location) {
				newPlace.location = {
					type: "Point",
					coordinates: [
						Decimal128.fromString(location.latitude),
						Decimal128.fromString(location.longitude),
					]
				}
			}

			db.getDb()
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
};

module.exports = addNew;
