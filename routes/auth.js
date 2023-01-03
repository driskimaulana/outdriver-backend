import express from 'express';

import { signIn, signUp, getAllDrivers } from '../controllers/user.js';

// import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/allDrivers', getAllDrivers);

export default router;