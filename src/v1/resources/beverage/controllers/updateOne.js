import Beverage from '../beverage.model';
import normalizeToSave from '../normalizers/toSave';

const updateOne = (req, res) => {
	Beverage
		.replaceOne({
			_id: req.body.id,
		}, normalizeToSave(req.body))
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

export default updateOne;
