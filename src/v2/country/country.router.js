import { Router } from 'express';

import { isAuth } from 'utils/middlewares';
import { getMany, saveOne } from './controllers';

const router = Router();

router.route('/')
	.get(getMany)
	.post(isAuth, saveOne);

export default router;
