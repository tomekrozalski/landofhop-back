import Beverage from '../beverage.model';
import { removeGallery } from '../images/gallery';

const deleteGalleryImages = (req, res) => {
	const {
		badge,
		brand,
		files,
		id,
		shortId,
	} = req.body;

	removeGallery({
		brand,
		badge,
		files,
		shortId,
	}, res, () => {
		Beverage
			.findByIdAndUpdate(id, {
				$unset: { 'editorial.images': '' },
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

export default deleteGalleryImages;
