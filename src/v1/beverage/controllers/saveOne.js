import Beverage from 'models/beverage';
import normalizeToSave from '../normalizers/toSave';

const saveOne = (req, res) => {
	const { shortId } = req;

	const beverage = new Beverage({
		...normalizeToSave(req.body),
		shortId,
	});

	beverage
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
