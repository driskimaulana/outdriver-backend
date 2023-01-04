import express from "express";
import { createTransaction, searchNearestDriver, getTransaction, acceptTransaction, rejectTransaction, deleteTransaction, doneTransaction, getTransactionByCustomerId, getTransactionByDriverId } from "../controllers/transaction.js"

import auth from "../middleware/auth.js";

/**
* Programmer: D'Riski Maulana
* Filename: transaction.js
* Contact: driskimaulana@upi.edu
* Date: 01/03/2023
* Description: routes to connect endpoint with the transaction controllers
**/

const router = express.Router();

router.post('/searchDriver', auth, searchNearestDriver);
router.post('/orderDriver', auth, createTransaction);
router.post('/getTransactions', auth, getTransaction);
router.post('/acceptTransaction', auth, acceptTransaction);
router.post('/rejectTransaction', auth, rejectTransaction);
router.post('/deleteTransaction', auth, deleteTransaction);
router.post('/doneTransaction', auth, doneTransaction);
router.get('/getTransactionByCustomerId', auth, getTransactionByCustomerId);
router.get('/getTransactionByDriverId', auth, getTransactionByDriverId);


export default router;