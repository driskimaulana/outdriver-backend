import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import authRoutes from './routes/auth.js';
import transactionRoutes from './routes/transaction.js';
import reviewRoutes from './routes/review.js';

import * as dotenv from "dotenv";

/**
* Programmer: D'Riski Maulana
* Filename: index.js
* Contact: driskimaulana@upi.edu
* Date: 12/28/2022
* Description: entry point application
**/

dotenv.config();

mongoose.set('strictQuery', false);

const app = express();

app.use(bodyParser.json({limit: "10mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "10mb", extended: true}));

app.use(cors());

app.use('/user', authRoutes);
app.use('/transaction', transactionRoutes);
app.use('/review', reviewRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
	.then(() => app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`)))
	.catch((error) => console.log(error));