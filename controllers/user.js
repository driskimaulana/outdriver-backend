import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { request, response } from 'express';

dotenv.config();

const jwtSecret = process.env.SECRET_JWT;

export const signIn = async (req, res) => {
	const { email, password } = req.body;

	try {
		const oldUser = await User.findOne({ email });
		
		if (!oldUser) return res.status(404).json({ message: "User not found" });

		const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

		if (!isPasswordCorrect) return res.status(400).json({ message: "Incorect Password" });

		const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, jwtSecret);

		res.status(200).json({ token: token, result: oldUser });
	} catch(err) {
		res.status(500).json({ message: "Something went wrong." });
	}
}

export const signUp = async (req, res) => {
	const { name, email, password, role } = req.body;
	
	try {
		const oldUser = await User.findOne({ email });

		if (oldUser) {
			return res.status(400).json({ message: "Email already taken" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await User.create({ name: name, email: email, password: hashedPassword, role: role });

		const token = jwt.sign({ email: result.email, id: result._id }, jwtSecret);
		res.status(201).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
		console.log(error);
	}
}

export const getAllDrivers = async (req, res) => {
	try {
		
		const drivers = await User.find({ role: "Driver" });

		if (!drivers) {
			return res.status(404).json({ message: "No drivers found." });
		}

		res.status(200).json({ "message": "Successfully get drivers data", "result": drivers });

	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
	}
}