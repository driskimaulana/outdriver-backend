import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import authRoutes from './routes/auth.js';

import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json({limit: "10mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "10mb", extended: true}));

app.use(cors());

app.use('/user', authRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
	.then(() => app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`)))
	.catch((error) => console.log(error));