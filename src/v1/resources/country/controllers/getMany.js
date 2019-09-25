import Country from '../country.model';

const getMany = (req, res) => {
	Country
		.aggregate([
			{
				$project: {
					_id: 0,
					value: '$_id',
					name: 1,
				},
			},
			{
				$unwind: '$name',
			},
			{
				$match: {
					'name.language': 'pl',
				},
			},
			{
				$project: {
					value: 1,
					label: '$name.value',
				},
			},
			{
				$sort: { label: 1 },
			},
		])
		.then((result) => {
			res
				.status(200)
				.json(result);
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'An error occured' });
		});
};

export default getMany;
