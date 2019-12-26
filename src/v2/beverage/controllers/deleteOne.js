import Beverage from 'models/beverage';
import { removeBeverageImages } from '../images';

const saveOne = (req, res) => {
	const { files, id, params } = req.body;
	const { badge, brand, shortId } = params;

	removeBeverageImages({
		badge,
		brand,
		files,
		shortId,
	}, res, () => {
		Beverage
			.deleteOne({ _id: id })
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
	});
};

export default saveOne;
