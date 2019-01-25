const Router = require('express').Router;

const db = require('../db');
const router = Router();

router.get('/list', (req, res, next) => {
	const languages = [];

	db.getDb()
		.db()
		.collection('languages')
		.aggregate([
			{
				$project: {
					_id: 0,
					value: '$_id',
					label: `$name.${req.query.lang}`
				}
			},
			{
				$sort: { 'label': 1 }
			}
		])
		.forEach((language) => {
			languages.push(language);
		})
		.then((result) => {
			res
				.status(200)
				.json(languages);
		})
		.catch((err) => {
			res
				.status(500)
				.json({ message: 'An error occured' });
		});
});

module.exports = router;
