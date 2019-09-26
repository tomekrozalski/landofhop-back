import Beverage from '../beverage.model';
import { saveGallery } from '../images/gallery';

const saveGalleryImages = (req, res) => {
	const {
		brand,
		badge,
		id,
		shortId,
	} = req.body;

	saveGallery(req.files, { brand, badge, shortId }, () => {
		Beverage
			.findByIdAndUpdate(id, {
				'editorial.images': req.files.length,
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

export default saveGalleryImages;
