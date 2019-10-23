import Place from 'models/place';

const saveOne = (req, res) => {
	const {
		body: {
			city,
			country,
			institution,
			latitude,
			longitude,
		},
		shortId,
	} = req;

	const place = new Place({
		city,
		country,
		institution,
		shortId,
		...(latitude && longitude && {
			location: {
				type: 'Point',
				coordinates: [
					latitude,
					longitude,
				],
			},
		}),
	});

	place
		.save()
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

export default saveOne;
