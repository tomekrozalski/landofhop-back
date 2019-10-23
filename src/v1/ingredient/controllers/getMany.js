import Ingredient from 'models/ingredient';

const getMany = (req, res) => {
	Ingredient
		.aggregate([
			{
				$project: {
					_id: 0,
					id: '$_id',
					name: {
						$slice: ['$name', 1],
					},
					type: 1,
				},
			},
			{
				$unwind: '$name',
			},
			{
				$project: {
					value: '$id',
					label: '$name.value',
					type: 1,
				},
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
