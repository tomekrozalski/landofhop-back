const db = require('../../db');

const getList = (req, res) => {
	const beverages = [];

	db.getDb()
		.collection('beverages')
		.aggregate([
			{
				$project: {
					_id: 0,
					added: 1,
					badge: 1,
					brand: '$label.general.brand',
					container: '$label.container',
					id: '$_id',
					name: '$label.general.name',
					shortId: 1,
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
				$unwind: '$brand_info'
			},
			{
				$project: {
					added: 1,
					badge: 1,
					brand: {
						badge: '$brand_info.badge',
						name: '$brand_info.name'
					},
					container: {
						type: 1,
						unit: 1,
						value: 1,
					},
					id: 1,
					name: 1,
					shortId: 1,
				}
			},
		])
		.forEach((beverage) => {
			const formattedBeverage = {
				...beverage,
				container: {
					...beverage.container,
					value: Number(beverage.container.value.toString())
				}
			}

			beverages.push(formattedBeverage);
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
};

module.exports = getList;
