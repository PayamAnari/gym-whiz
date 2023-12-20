import Review from "../models/Review.js";
import Gym from "../models/Gym.js";
import { logError } from "../util/logging.js";
import mongoose from "mongoose";

export const createReview = async (req, res) => {
  // round avg rating
  const roundToHalf = (value) => {
    return Math.round(value * 2) / 2;
  };

  try {
    // Extract data from the request body (user ID, gym ID, rating, comment)
    const { userId, gymId, rating, comment, reviewer } = req.body;

    // Create a new review document
    const newReview = await Review.create({
      user: userId,
      gym: gymId,
      rating,
      comment,
      reviewer,
    });

    // calculate and update average rate
    const averageRating = await Review.aggregate([
      { $match: { gym: mongoose.Types.ObjectId(gymId) } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);

    let newRating = 0;
    if (averageRating.length > 0 && averageRating[0].avgRating != null) {
      newRating = roundToHalf(averageRating[0].avgRating);
    }

    // update average rating in db
    await Gym.findByIdAndUpdate(gymId, { rating: newRating });

    res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: "Unable to create a review" });
  }
};

export const getReviewsByGym = async (req, res) => {
  try {
    const gymId = req.params.gymId;

    const reviews = await Review.find({ gym: gymId });

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get reviews for the gym" });
  }
};
