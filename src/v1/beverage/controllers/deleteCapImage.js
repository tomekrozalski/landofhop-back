import Beverage from 'models/beverage';
import { removeCap } from '../images/cap';

const deleteCapImage = (req, res) => {
	const {
		badge,
		brand,
		id,
		shortId,
	} = req.body;

	removeCap({ badge, brand, shortId }, res, () => {
		Beverage
			.findByIdAndUpdate(id, {
				$unset: { 'editorial.photos.cap': '' },
			}, { useFindAndModify: false })
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

export default deleteCapImage;
