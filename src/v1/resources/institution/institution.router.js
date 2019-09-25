import { Router } from 'express';

import { isAuth, withShortId } from 'utils/middlewares';
import { getMany, saveOne } from './controllers';

const router = Router();

router.route('/')
	.get(getMany)
	.post(isAuth, withShortId, saveOne);

export default router;
