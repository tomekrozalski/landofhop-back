import { Router } from 'express';

import { isAuth } from 'utils/middlewares';
import { checkAuth, login, logout } from './controllers';

const router = Router();

router.route('/')
	.get(isAuth, checkAuth)
	.post(login)
	.delete(logout);

export default router;
