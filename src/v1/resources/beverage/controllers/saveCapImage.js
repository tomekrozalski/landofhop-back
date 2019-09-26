import Beverage from '../beverage.model';
import { saveCap } from '../images/cap';

const saveCapImage = (req, res) => {
	const { buffer } = req.file;
	const {
		brand,
		badge,
		id,
		shortId,
	} = req.body;

	const capPath = `${brand}/${badge}/${shortId}/cap`;

	saveCap(buffer, capPath, () => {
		Beverage
			.findByIdAndUpdate(id, { 'editorial.cap': true }, { useFindAndModify: false })
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

export default saveCapImage;
