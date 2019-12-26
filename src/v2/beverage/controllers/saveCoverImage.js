import Beverage from 'models/beverage';
import { saveCover } from '../images/cover';

const saveCoverImage = (req, res) => {
	const { buffer } = req.file;
	const {
		brand,
		badge,
		id,
		shortId,
	} = req.body;

	const coverPath = `${brand}/${badge}/${shortId}/cover`;

	saveCover(buffer, coverPath, ({ height, width }) => {
		Beverage
			.findByIdAndUpdate(id, {
				'editorial.photos.cover': { height, width },
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

export default saveCoverImage;
