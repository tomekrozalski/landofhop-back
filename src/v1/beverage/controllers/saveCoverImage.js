import Beverage from 'models/beverage';
import { saveCover } from '../images/cover';

const saveCoverImage = (req, res) => {
	const { buffer } = req.file;
	const {
		brand,
		badge,
		height,
		id,
		shortId,
		width,
	} = req.body;

	const coverPath = `${brand}/${badge}/${shortId}/cover`;

	saveCover(buffer, coverPath, () => {
		Beverage
			.findByIdAndUpdate(id, {
				'editorial.coverImage': {
					height: Number(height),
					width: Number(width),
				},
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
