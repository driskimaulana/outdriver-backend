/**
 * Programmer: D'Riski Maulana
 * Filename: review.js
 * Contact: driskimaulana@upi.edu
 * Date: 01/03/2023
 * Description: controllers for review outdriver
 **/

import Review from "../models/review.js";
import User from "../models/user.js";

export const createReview = async (
  /**@type import("express").Request */ req,
  /**@type import("express").Response */ res
) => {
  const { transactionId, driverId, rating, comment } = req.body;
  const id = req.userId;

  try {
    const customer = await User.findById(id);
    const driver = await User.findById(driverId);

    if (customer == null && driver == null) {
      return res
        .status(404)
        .json({ status: "Error", message: "Customer or driver not found." });
    }

    driver.ratingsCount++;
    driver.ratingsTotal = driver.ratingsTotal + rating;
    driver.ratings = driver.ratingsTotal / driver.ratingsCount;

    await driver.save().then((savedDoc) => {
      savedDoc === driver;
    });

    const newReview = new Review({
      transactionId: transactionId,
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
      rating: rating,
      comment: comment,
    });

    await newReview.save((err, message) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          status: "Error",
          message: "Can't perform operations. Bad Request.",
        });
      }

      res.status(200).json({
        status: "Success",
        message: "New review added.",
        data: newReview,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: "Someting went wrong." });
  }
};

export const deleteReview = async (
  /**@type import("express").Request */ req,
  /**@type import("express").Response */ res
) => {
  const { reviewId } = req.body;
  try {
    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ status: "Success", message: "Review deleted." });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Something went wrong." });
  }
};

export const getDriverReviews = async (
  /** @type import("express").Request */ req,
  /** @type import("express").Responses */ res
) => {
  const driverId = req.userId;

  try {
    const results = await Review.find({
      "driver._id": driverId,
    });
    if (results == null) {
      return res
        .status(404)
        .json({ status: "Error", message: "Review not found." });
    }

    res.status(200).json({
      status: "Success",
      message: "Fetch data success",
      data: results,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", message: "Failed to fetch driver revies." });
  }
};

export const checkCustomerReview = async (
  /** @type import("express").Request */ req,
  /** @type import("express").Responses */ res
) => {
  const { transactionId } = req.body;
  const id = req.userId;

  console.log("MASUK KE DALEM SINI " + transactionId);
  try {
    const results = await Review.find({
      transactionId: transactionId,
      "customer._id": id,
    });
    console.log("SAMPE SINI");
    console.log(results);
    if (results == null) {
      return res
        .status(200)
        .json({ status: "Succes", message: "Review not found." });
    }

    res.status(200).json({
      status: "Success",
      message: "Fetch data success",
      data: results,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", message: "Failed to fetch driver revies." });
  }
};

export const getCustomerReview = async (
  /** @type import("express").Request */ req,
  /** @type import("express").Responses */ res
) => {
  const { transactionId } = req.body;
  const id = req.userId;
  try {
    const result = await Review.find({
      transactionId: transactionId,
      customer: {
        _id: id,
      },
    });
    if (result == null) {
      return res
        .status(404)
        .json({ status: "Error", message: "Review not found." });
    }

    res.status(200).json({
      status: "Success",
      message: "Fetch data success",
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", message: "Failed to fetch driver revies." });
  }
};
