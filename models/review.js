import mongoose from "mongoose";

/**
* Programmer: D'Riski Maulana
* Filename: transactions.js
* Contact: driskimaulana@upi.edu
* Date: 01/03/2023
* Description: model for transaction
**/

const reviewSchema = mongoose.Schema({
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
    rating: {
        type: Number,
        required: true,
    }, 
    comment: {
        type: String,
    }
})

var Review = mongoose.model("Review", reviewSchema);

export default Review;