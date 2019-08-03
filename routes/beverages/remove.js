const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const db = require('../../db');

const ObjectId = mongodb.ObjectId;

const remove = (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			db.getDb()
				.collection('beverages')
				.deleteOne({ _id: new ObjectId(req.body.id) })
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

module.exports = remove;
