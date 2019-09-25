import Country from '../country.model';

const saveOne = (req, res) => {
	const country = new Country(req.body);

	country
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
