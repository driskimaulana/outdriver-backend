import Transaction from "../models/transactions.js";
import User from "../models/user.js";

/**
* Programmer: D'Riski Maulana
* Filename: transaction.js
* Contact: driskimaulana@upi.edu
* Date: 01/03/2023
* Description: controllers for transaction outdriver
**/

export const searchNearestDriver = async ( /**@type import("express").Request */ req, /**@type import("express").Response */ res) => {

    const { latitude, longitude } = req.body;

    try {

        const nearestDriver = await User.find({
            location: {
                $near: {
                    $maxDistance: 10000,
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    }
                }
            },
            role: "Driver"
        });

        res.status(200).json({ status: "Success", message: "Nearest driver has found.", data: nearestDriver[0] });
        
    } catch (error) {
        res.status(500).json({ status: "Error", message: "Someting went wrong." });
    }

}

export const createTransaction = async ( /**@type import("express").Request */ req, /**@type import("express").Response */ res) => {

    const { driverId, fromName, toName, fromCoords, toCoords, paymentMethod, cost } = req.body;
    const id = req.userId;

    try {

        const customer = await User.findById(id);
        const driver = await User.findById(driverId);

        if (customer == null && driver == null) {
            return res.status(404).json({ status: "Error", message: "Customer or driver not found." });
        }
        const newTransaction = new Transaction({
            customer: {
                _id: customer._id,
                name: customer.name,
                email: customer.email,
                image_profile: customer.image_profile, 
            },
            driver: {
                _id: driver._id,
                name: driver.name,
                email: driver.email,
                image_profile: driver.image_profile, 
            },
            from: {
                type: "Point",
                name: fromName,
                coordinates: fromCoords,
            },
            to: {
                type: "Point",
                name: toName,
                coordinates: toCoords,
            },
            status: "Waiting",
            cost: cost,
            paymentMethod: paymentMethod,
        });

        const result = await newTransaction.save((err, message) => {
            if(err) {
                console.log(err);
                return res.status(400).json({ status: "Error", message: "Can't perform operations. Bad Request." });
            }

            res.status(200).json({ status: "Success", message: "Sending Transaction to driver success.", data: newTransaction });

        })

        
    } catch (error) {
        res.status(500).json({ status: "Error", message: "Someting went wrong." });
    }

}

export const acceptTransaction = async ( /**@type import("express").Request */ req, /**@type import("express").Response */ res) => {
    const { transactionId } = req.body;
    try {
        
        const transaction = await Transaction.findById(transactionId);
        if (transaction == null) {
            return res.status(404).json({ status: "Error", message: "Transaction not found." });
        }

        transaction.status = "Accepted";
        await transaction.save().then(savedDoc => {
            savedDoc === transaction;
        })

        res.status(200).json({ status: "Success", message: "Pesanan Diterima", data: "Accepted" });
    } catch (error) {
        res.status(500).json({ status: "Error", message: "Something went wrong." });
    }

}

export const rejectTransaction = async ( /**@type import("express").Request */ req, /**@type import("express").Response */ res) => {
    const { transactionId } = req.body;
    try {
        
        const transaction = await Transaction.findById(transactionId);
        if (transaction == null) {
            return res.status(404).json({ status: "Error", message: "Transaction not found." });
        }

        transaction.status = "Rejected";
        await transaction.save().then(savedDoc => {
            savedDoc === transaction;
        })

        res.status(200).json({ status: "Success", message: "Pesanan Diterima", data: "Rejected" });
    } catch (error) {
        res.status(500).json({ status: "Error", message: "Something went wrong." });
    }

}

export const getTransaction = async ( /**@type import("express").Request */ req, /**@type import("express").Response */ res) => {
    const { transactionId } = req.body;
    try {
        
        const transaction = await Transaction.findById(transactionId);
        if (transaction == null) {
            return res.status(404).json({ status: "Error", message: "Transaction not found." });
        }

        res.status(200).json({ status: "Success", message: "Pesanan Diterima", data: transaction });
    } catch (error) {
        res.status(500).json({ status: "Error", message: "Something went wrong." });
    }

}


export const deleteTransaction = async ( /**@type import("express").Request */ req, /**@type import("express").Response */ res) => {
    const { transactionId } = req.body;
    try {
        
        await Transaction.findByIdAndDelete(transactionId);

        res.status(200).json({ status: "Success", message: "Transaction deleted." });
    } catch (error) {
        res.status(500).json({ status: "Error", message: "Something went wrong." });
    }

}

export const doneTransaction = async ( /**@type import("express").Request */ req, /**@type import("express").Response */ res) => {
    const { transactionId } = req.body;
    try {
        
        const transaction = await Transaction.findById(transactionId);
        if (transaction == null) {
            return res.status(404).json({ status: "Error", message: "Transaction not found." });
        }

        transaction.status = "Done";
        await transaction.save().then(savedDoc => {
            savedDoc === transaction;
        })

        res.status(200).json({ status: "Success", message: "Pesanan Diterima", data: "Done" });
    } catch (error) {
        res.status(500).json({ status: "Error", message: "Something went wrong." });
    }

}

export const getTransactionByCustomerId = async ( /**@type import("express").Request */ req, /**@type import("express").Response */ res) => {
    const userId = req.userId;

    try {
        
        const transactions = await Transaction.find({
            "customer._id": userId,
        });

        if (transactions == null) {
            res.status(404).json({ status: "Error", message: "No transactions found with this user id" });
        }

        res.status(200).json({ status: "Success", message: "Fetch transactions success.", data: transactions });
    } catch (error) {
        res.status(500).json({ status: "Error", message: "Something went wrong." });
    }

}

export const getTransactionByDriverId = async ( /**@type import("express").Request */ req, /**@type import("express").Response */ res) => {
    const userId = req.userId;

    try {
        
        const transactions = await Transaction.find({
            "driver._id": userId,
        });

        console.log(transactions);

        if (transactions == null) {
            return res.status(404).json({ status: "Error", message: "No transactions found with this driver id" });
        }

        res.status(200).json({ status: "Success", message: "Fetch transactions success.", data: transactions });
    } catch (error) {
        res.status(500).json({ status: "Error", message: "Something went wrong." });
    }

}



