import express from 'express';

import { signIn, signUp, getAllDrivers, getUserLoggedin, refreshLocation } from '../controllers/user.js';

import auth from '../middleware/auth.js';

/**
* Programmer: D'Riski Maulana
* Filename: auth.js
* Contact: driskimaulana@upi.edu
* Date: 01/03/2023
* Description: routes to connect endpoint with the right controllers
**/

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/allDrivers', getAllDrivers);
router.post('/getLoggedinUser', auth, getUserLoggedin);
router.post('/refreshLocation', auth, refreshLocation);

export default router;