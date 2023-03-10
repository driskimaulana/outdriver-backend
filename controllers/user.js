import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
import mongoose from "mongoose";

/**
* Programmer: D'Riski Maulana
* Filename: user.js
* Contact: driskimaulana@upi.edu
* Date: 01/03/2023
* Description: controllers to communicate with user models
**/

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

export const getUserLoggedin = async (/**@type import("express").Request */ req, /**@type import("express").Response */ res) => {

	const { latitude, longitude } = req.body;
	const id = req.userId;

	if(!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ status: "Error", message: `User with id ${id} is not found.` });
	}

	try {

		const userLoggedin = await User.findById(id);

		userLoggedin.location = {
			type: "Point",
			coordinates: [latitude, longitude],
		};

		await userLoggedin.save().then(savedDoc => {
			savedDoc === userLoggedin;
		})

		if(!userLoggedin) {
			return res.status(404).json({ status: "Error", message: `User with id ${id} is not found` })
		}
		

		res.status(200).json({ status: "Success", message: "Succesffuly update latidue and longitude", data: userLoggedin });
	} catch (error) {
		res.status(409).json({ status: "Error", message: error.message });
	}
}

export const refreshLocation = async (/**@type import("express").Request */ req, /**@type import("express").Response */ res) => {

	const { latitude, longitude } = req.body;
	const id = req.userId;

	
	try {
		const userLoggedin = await User.findById(id);
		
		if(!userLoggedin) {
			return res.status(404).json({ status: "Error", message: `User with id ${id} is not found.` });
		}
		
		// userLoggedin.location = [latitude, longitude];
		userLoggedin.location = {
			type: "Point",
			coordinates: [longitude, latitude],
		};

		const isSuccess = await userLoggedin.save().then(savedDoc => {
			savedDoc === userLoggedin;
		});

		res.status(200).json({ status: "Success", message: "Successfully update user location" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: "Error", message: "Something went wrong." });
	}

}

export const changeAcceptOrder = async (/**@type import("express").Request */ req, /**@type import("express").Response */ res) => {

	const id = req.userId;
	
	try {
		const userLoggedin = await User.findById(id);
		
		if(!userLoggedin) {
			return res.status(404).json({ status: "Error", message: `User with id ${id} is not found.` });
		}

		if (userLoggedin.role === "Customer") {
			return res.status(404).json({ status: "Error", message: `User with id ${id} is not a driver.` });
		}
		
		userLoggedin.acceptOrder = !userLoggedin.acceptOrder;

		await userLoggedin.save().then(savedDoc => {
			savedDoc === userLoggedin;
		});

		res.status(200).json({ status: "Success", message: "Successfully update driver accept order status.", data: userLoggedin});
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: "Error", message: "Something went wrong." });
	}

}