import { Router } from 'express';
import multer from 'multer';

import { isAuth, withShortId } from 'utils/middlewares';
import {
	deleteCapImage,
	deleteGalleryImages,
	deleteOne,
	getMany,
	getOne,
	saveCapImage,
	saveCoverImage,
	saveGalleryImages,
	saveOne,
	updateOne,
} from './controllers';

const router = Router();
const upload = multer({});

router.get('/:skip/:limit', getMany);
router.route('/')
	.post(isAuth, withShortId, saveOne)
	.put(isAuth, updateOne)
	.delete(isAuth, deleteOne);
router.get('/:shortId/:brand/:badge', getOne);
router.post('/cover', isAuth, upload.single('image'), saveCoverImage);
router.route('/gallery')
	.post(isAuth, upload.array('image'), saveGalleryImages)
	.delete(isAuth, deleteGalleryImages);
router.route('/cap')
	.post(isAuth, upload.single('image'), saveCapImage)
	.delete(isAuth, deleteCapImage);

export default router;
