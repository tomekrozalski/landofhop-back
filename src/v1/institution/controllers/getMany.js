import Institution from 'models/institution';

const getMany = (req, res) => {
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
				},
			},
			{
				$unwind: {
					path: '$name',
				},
			},
			{
				$project: {
					badge: 1,
					label: '$name.value',
					value: 1,
				},
			},
			{
				$sort: { name: 1 },
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
