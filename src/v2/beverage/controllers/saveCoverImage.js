import { saveCover } from '../images/cover';

const saveCoverImage = (req, res) => {
	const { buffer } = req.file;
	const {
		brand,
		badge,
		shortId,
	} = req.body;

	const coverPath = `${brand}/${badge}/${shortId}/cover`;

	saveCover(buffer, coverPath, () => {
		res.status(200).json({ success: true });
	});
};

export default saveCoverImage;
