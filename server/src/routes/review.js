import express from "express";
import { createReview, getReviewsByGym } from "../controllers/review.js";

const reviewRouter = express.Router();

// Create a new review
reviewRouter.post("/:gymId", createReview);

// Get reviews for a specific gym
reviewRouter.get("/:gymId", getReviewsByGym);

export default reviewRouter;
