import Institution from 'models/institution';

const saveOne = (req, res) => {
	const {
		body: {
			badge,
			name,
			website,
			consortium,
		},
		shortId,
	} = req;

	const institution = new Institution({
		badge,
		name,
		shortId,
		...(website && { website }),
		...(consortium && { consortium }),
	});

	institution
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
