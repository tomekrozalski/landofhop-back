const Router = require('express').Router;
const jwt = require('jsonwebtoken');

const Institution = require('../models/Institution');
const shortIdGenerator = require('../utils/shortIdGenerator');
const verifyToken = require('../utils/verifyToken');

const router = Router();

/*
 * ------------------------------------------------------------------
 * GET LIST OF INSTITUTIONS
 */

router.get('/list', (req, res) => {
	Institution
		.aggregate([
			{
				$project: {
					_id: 0,
					badge: 1,
					name: {
						$slice: ['$name', 1],
					},
					value: '$_id',
				}
			},
			{
				$unwind: {
					path: '$name',
				}
			},
			{
				$project: {
					badge: 1,
					label: '$name.value',
					value: 1,
				}
			},
			{
				$sort: { name : 1 }
			}
		])
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
});

/*
 * ------------------------------------------------------------------
 * ADD NEW INSTITUTION
 */

router.post('/', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			const {
				badge,
				name,
				website,
				consortium,
			} = req.body;

			const place = new Institution({
				badge,
				name,
				shortId: shortIdGenerator(),
				...(website && { website }),
				...(consortium && { consortium })
				
			});

			place
				.save()
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
