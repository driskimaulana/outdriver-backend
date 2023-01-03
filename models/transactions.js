import mongoose from "mongoose";

/**
* Programmer: D'Riski Maulana
* Filename: transactions.js
* Contact: driskimaulana@upi.edu
* Date: 01/03/2023
* Description: model for transaction
**/

const transactionSchema = mongoose.Schema({

    customer: {
        _id: { type: String, required: true },
        name: { type: String, required: true},
        email: { type: String },
        image_profile: { type: String },
    },
    driver: {
        _id: { type: String, required: true },
        name: { type: String, required: true},
        email: { type: String },
        image_profile: { type: String },
    },
    from: {
        type: {
            type: String,
            default: "Point",
        },
        name: {
            type: String,
        },
        coordinates: {
            type: [],
            required: true,
        }
    },
    to: {
        type: {
            type: String,
            default: "Point",
        },
        name: {
            type: String,
        },
        coordinates: {
            type: [],
            required: true,
        }
    },
    status: {
        type: String,
        /**
         * Waiting,
         * Accepted,
         * Rejected
         * Done
         */
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    cost: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    }

})

var Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;