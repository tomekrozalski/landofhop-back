import { Router } from 'express';

import { isAuth } from 'utils/middlewares';
import { checkAuth, login } from './controllers';

const router = Router();

router.route('/')
	.get(isAuth, checkAuth)
	.post(login);

export default router;
