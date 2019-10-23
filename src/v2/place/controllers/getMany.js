import Place from 'models/place';

const getMany = (req, res) => {
	Place
		.aggregate([
			{
				$project: {
					city: {
						$slice: ['$city', 1],
					},
					_id: 0,
					id: '$_id',
					institution_id: '$institution',
				},
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'institution_id',
					foreignField: '_id',
					as: 'institution',
				},
			},
			{
				$unwind: {
					path: '$institution',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$unwind: {
					path: '$city',
				},
			},
			{
				$project: {
					city: 1,
					id: 1,
					institution: {
						$slice: ['$institution.name', 1],
					},
				},
			},
			{
				$unwind: {
					path: '$institution',
				},
			},
			{
				$project: {
					label: {
						$concat: ['$city.value', ' (', '$institution.value', ')'],
					},
					value: '$id',
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
