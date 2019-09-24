import { Router } from 'express';

import controller from './country.controllers';

const router = Router();

router.route('/')
	.get(controller);

export default router;
