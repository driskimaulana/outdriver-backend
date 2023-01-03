import express from "express";

import { createReview, getDriverReviews, deleteReview } from "../controllers/review.js";

import auth from "../middleware/auth.js";

/**
* Programmer: D'Riski Maulana
* Filename: review.js
* Contact: driskimaulana@upi.edu
* Date: 01/03/2023
* Description: routes to connect endpoint with the right controllers
**/

const router = express.Router();

router.post('/createReview', auth, createReview);
router.post('/getDriverReviews', auth, getDriverReviews);
router.post('/deleteReview', auth, deleteReview);

export default router;