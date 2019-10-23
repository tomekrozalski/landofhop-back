import Beverage from 'models/beverage';

const getMany = (req, res) => {
	Beverage
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
				},
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'brand',
					foreignField: '_id',
					as: 'brand_info',
				},
			},
			{
				$unwind: '$brand_info',
			},
			{
				$project: {
					added: 1,
					badge: 1,
					brand: {
						badge: '$brand_info.badge',
						name: '$brand_info.name',
					},
					container: {
						type: 1,
						unit: 1,
						value: 1,
					},
					id: 1,
					name: 1,
					shortId: 1,
				},
			},
		])
		.then((result) => {
			const formattedResults = result.map(beverage => ({
				...beverage,
				container: {
					...beverage.container,
					value: Number(beverage.container.value.toString()),
				},
			}));

			res
				.status(200)
				.json(formattedResults);
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'An error occured' });
		});
};

export default getMany;
